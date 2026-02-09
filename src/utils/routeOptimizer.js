import { mockMapsService } from './mockMapsService';
import { getCustomWeight } from '../data/knowledgeBase';

/**
 * Optimizes the route sequence based on hours, distance, and custom weights.
 * @param {string} startLocation - Name of the starting point
 * @param {Array<string>} destinations - Array of place names to visit
 * @param {Date} startTime - Start time object
 * @returns {Promise<Array>} - Ordered list of stop objects with arrival times
 */
export const optimizeRoute = async (startLocation, destinations, startTime = new Date()) => {
    let currentLocation = startLocation;
    let currentTime = new Date(startTime);

    // Initial Route Log
    const finalRoute = [{
        name: startLocation,
        arrivalTime: new Date(currentTime),
        departureTime: new Date(currentTime), // Depart immediately
        type: 'start'
    }];

    let unvisited = [...destinations];
    // Filter out start location if user accidentally added it to destinations
    unvisited = unvisited.filter(loc => loc !== startLocation);

    while (unvisited.length > 0) {
        const possibleNextStops = [];

        // 1. Evaluate all remaining locations
        for (const loc of unvisited) {
            // Get Travel Info
            const travelInfo = await mockMapsService.getTravelInfo(currentLocation, loc);
            const travelTimeSec = travelInfo.duration.value;
            const travelTimeMs = travelTimeSec * 1000;

            // Predicted Arrival Time
            const arrivalTime = new Date(currentTime.getTime() + travelTimeMs);

            // 2. [PRIMARY CONSTRAINT] Check Real-time Opening Hours (Google Data)
            const isOpen = mockMapsService.isOpenAt(loc, arrivalTime);

            if (!isOpen) {
                // If closed, we strictly SKIP this candidate for this specific time slot.
                // It stays in 'unvisited' and might be picked up later in the loop 
                // when the time is more suitable (if applicable), or dropped.
                // For now, we continue to the next candidate.
                console.log(`[Optimizer] Skipping ${loc} - Closed at ${arrivalTime.toLocaleTimeString()}`);
                continue;
            }

            // 3. [SECONDARY WEIGHT] Personal Preferences (knowledge.md)
            const knowledgeWeight = getCustomWeight(loc, arrivalTime);

            // 4. Calculate Score
            // Score = (Knowledge Weight * Priority Multiplier) - (Travel Time cost)
            // We removed the 'Open Bonus' because being open is now a prerequisite.
            const travelPenalty = travelTimeSec / 60; // 1 point per minute

            const totalScore = (knowledgeWeight * 2) - travelPenalty;

            possibleNextStops.push({
                name: loc,
                travelTimeSec: travelTimeSec,
                arrivalTime: arrivalTime,
                score: totalScore,
                debug: { knowledgeWeight, travelPenalty }
            });
        }

        // 5. Select Best Next Stop
        // Sort by Score Descending
        possibleNextStops.sort((a, b) => b.score - a.score);

        const bestStop = possibleNextStops[0];

        if (!bestStop) {
            // CRITICAL: No open places found nearby/at this time.
            // Option: Advance time by 30 mins and try again (Wait)
            console.log(`[Optimizer] No open places found at ${currentTime.toLocaleTimeString()}. Waiting 30 mins...`);
            currentTime = new Date(currentTime.getTime() + 30 * 60000); // Wait 30 mins

            // Safety break to prevent infinite loop if everything is closed forever (e.g. 3 AM)
            if (currentTime.getHours() === 4) break;
            continue;
        }

        // 6. Update State
        const visitDurationMs = 60 * 60 * 1000; // Assume 1 hour visit
        const departureTime = new Date(bestStop.arrivalTime.getTime() + visitDurationMs);

        finalRoute.push({
            name: bestStop.name,
            arrivalTime: bestStop.arrivalTime,
            departureTime: departureTime,
            travelTimeText: Math.round(bestStop.travelTimeSec / 60) + ' min',
            isOpen: bestStop.isOpen,
            type: 'stop'
        });

        currentLocation = bestStop.name;
        currentTime = departureTime;

        // Remove from unvisited
        const removeIndex = unvisited.indexOf(bestStop.name);
        if (removeIndex > -1) {
            unvisited.splice(removeIndex, 1);
        }
    }

    return finalRoute;
};
