// Simulating the user's 'knowledge.md' custom weights
// Higher weight = Higher priority for that specific time/condition/sequence

export const getCustomWeight = (placeName, currentTime) => {
    let weight = 0;
    const hour = currentTime.getHours();

    // 1. Sunset Spots (Best around 17:00 - 18:30)
    if (['Promthep Cape', 'Baba Nest', 'Three Monkeys', 'Cafe Del Mar'].includes(placeName)) {
        if (hour >= 17 && hour <= 18) {
            weight += 50; // Huge priority for sunset time
        }
    }

    // 2. Morning Spots (Best before 11:00)
    if (['Ma Doo Bua Cafe', 'Mai Khao Plane Spotting'].includes(placeName)) {
        if (hour < 11) {
            weight += 30; // Priority for morning (cooler, better light)
        }
    }

    // 3. Nightlife (Best after 21:00)
    if (['Illuzion Phuket', 'Bangla Road'].includes(placeName)) {
        if (hour >= 21) {
            weight += 40;
        } else if (hour < 18) {
            weight -= 50; // Don't go too early
        }
    }

    // 4. Lunch Spots (12:00 - 14:00)
    if (['Tu Kab Khao'].includes(placeName)) {
        if (hour >= 11 && hour <= 14) {
            weight += 20;
        }
    }

    return weight;
};
