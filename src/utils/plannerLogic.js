export const generateItinerary = (input) => {
    const { flightTime, flightDate, isPregnant, children = 0, adults = 0, infants = 0 } = input;

    // Parse flight time
    const flightDateObj = new Date(flightDate + ' ' + flightTime);
    const airportArrival = new Date(flightDateObj.getTime() - 3 * 60 * 60 * 1000); // 3 hours before flight

    let itinerary = [];
    let currentTime = new Date(airportArrival);

    // 1. Drop off at Airport
    itinerary.unshift({
        time: formatTime(currentTime),
        activity: 'Phuket International Airport (Departure)',
        type: 'transport',
        duration: 0
    });

    // 2. Travel to Airport (Approx 1 hour from last location)
    currentTime = subtractMinutes(currentTime, 60);

    // 3. Last Activity: Massage or Dinner
    // Logic: Pregnant -> Oil Massage max 90min.
    const massageDuration = isPregnant ? 90 : 120; // Default 120, Pregnant 90
    const massageType = isPregnant ? 'Oil Massage (Pregnancy Safe)' : 'Thai Traditional Massage';

    itinerary.unshift({
        time: formatTime(subtractMinutes(currentTime, massageDuration)),
        activity: `55 Spa: ${massageType} + Shower`,
        type: 'massage',
        duration: massageDuration
    });
    currentTime = subtractMinutes(currentTime, massageDuration + 30); // +30min buffer/travel

    // 4. Dinner
    itinerary.unshift({
        time: formatTime(subtractMinutes(currentTime, 90)),
        activity: 'Three Monkeys Restaurant (Jungle Vibes)', // Default recommendation
        type: 'dining',
        duration: 90
    });
    currentTime = subtractMinutes(currentTime, 90 + 30);

    // 5. Main Tour / Activity
    // Logic: Child < 10 -> Baby Elephant. Pregnant -> No Speedboat.
    let mainActivity = {
        name: 'Phuket Old Town Walking Street',
        duration: 120,
        price: 0
    };

    if (children > 0) {
        mainActivity = {
            name: 'Elephant Care (2W Course) - Baby Elephant',
            duration: 180,
            price: 2500 // Dummy price
        };
    } else if (!isPregnant) {
        // If not pregnant and no kids, maybe Catamaran or standard tour
        mainActivity = {
            name: 'Phi Phi Island Catamaran Tour',
            duration: 300,
            price: 3500
        };
    }

    itinerary.unshift({
        time: formatTime(subtractMinutes(currentTime, mainActivity.duration)),
        activity: mainActivity.name,
        type: 'tour',
        duration: mainActivity.duration
    });

    return itinerary;
};

export const calculateCost = (selections) => {
    // selections: { tours: [], luggage: { count: 0, size: '20' }, pax: { adult: 2, child: 0 } }
    let totalCost = 0;
    let breakdown = [];

    // 1. Luggage Calculation
    const { luggage, tours = [] } = selections;
    let luggageCost = 0;

    // Example logic based on prompt
    // "General Tour/TTD Phi Phi: 200 THB"
    // "Elephant 4J: 600 THB (1-3 pax)"
    // "Banana Beach: 100 THB/pc"
    // "Similan: 21 inch+ 200 THB + 100 THB/pax" (Assuming logic is per person extra?)

    // Simplified implementation for the "Smart Calculator"
    // We need to know WHICH tour is selected to apply specific luggage rules.
    // Assuming 'tours' contains the selected main tour object with an ID or type.

    const mainTour = tours[0]; // Assuming 1 main tour for last day

    if (mainTour) {
        if (mainTour.id === 'elephant_4j') {
            luggageCost = 600; // Flat rate 1-3 pax
        } else if (mainTour.id === 'banana_beach') {
            luggageCost = luggage.count * 100;
        } else if (mainTour.id === 'similan') {
            if (parseInt(luggage.size) > 21) {
                luggageCost = 200 + (selections.pax.adult + selections.pax.child) * 100;
            }
        } else {
            // Default / TTD Phi Phi
            luggageCost = 200 * luggage.count;
        }
    }

    breakdown.push({ item: 'Luggage Storage', cost: luggageCost });
    totalCost += luggageCost;

    // 2. Transport Discount
    // "Tour reservation -> Airport Sending 900 - 200 = 700"
    let transportCost = 900;
    if (tours.length > 0) {
        transportCost = 700;
        breakdown.push({ item: 'Airport Transfer (Discounted)', cost: transportCost });
    } else {
        breakdown.push({ item: 'Airport Transfer', cost: transportCost });
    }
    totalCost += transportCost;

    return { total: totalCost, breakdown };
};

// Helpers
const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

const subtractMinutes = (date, minutes) => {
    return new Date(date.getTime() - minutes * 60000);
};
