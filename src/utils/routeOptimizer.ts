import { RecommendedPlace, RECOMMENDED_PLACES } from '../data/recommendedPlaces';

// Helper to calculate distance between two points
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLng = deg2rad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

// Logic:
// 1. Start is fixed (Hotel - Start Point).
// 2. End is fixed (Airport - End Point).
// 3. User selected places need to be ordered.
// 4. Constraint: Global direction should be roughly South -> North (increasing Latitude).
// 5. Optimization: minimize total distance while respecting South -> North flow.

export function optimizeRoute(startPlace: RecommendedPlace, endPlace: RecommendedPlace, selectedPlaces: RecommendedPlace[]): RecommendedPlace[] {
    // 1. Sort selected places by Latitude (South to North)
    // This enforces the "Start from South, go up to North" rule roughly.
    // Phuket extends North-South. Lat increases as you go North.
    // However, user might start at a Northern hotel. If so, logic should adapt or strict enforcement?
    // User request: "Start Hotel (South) -> Central -> North (Airport)".
    // So we assume Start is southerly relative to End.

    // Let's filter out start/end if they accidentally got into selected list
    const middlePlaces = selectedPlaces.filter(p => p.id !== startPlace.id && p.id !== endPlace.id);

    // Sort by Latitude ASC (South -> North)
    middlePlaces.sort((a, b) => a.lat - b.lat);

    // 2. Refine order:
    // Sometimes a zigzag happens if we strictly sort by Lat.
    // e.g. Point A (Lat 7.9, Lng 98.3) -> Point B (Lat 7.91, Lng 98.4) -> Point C (Lat 7.92, Lng 98.2)
    // A -> B -> C is South->North, but lateral movement is huge.
    // Simple Lat sort is usually "good enough" for Phuket's shape (narrow N-S strip), 
    // but let's do a greedy next-nearest approach RESTRICTED to forward progress or small backward buffer.

    // Actually, "South -> North" is the key user constraint. 
    // "거꾸로 내려갔다 올라오는 동선은 무조건 배제해"
    // This implies strictly non-decreasing Latitude is safest to satisfy the user.

    // What if the hotel is actually North of some selected places?
    // User scenario: "South Hotel".
    // If Start is North of some selected places, we must visit those first? Or skip?
    // If we must visit them, we have to go South then North.
    // But user said "Ban backward movement". 
    // We will stick to strict Latitude sort.

    return [startPlace, ...middlePlaces, endPlace];
}

// Ensure the last place before airport is northern-most or close to airport road?
// The sort by Lat handles this naturally. The northern-most place will be last.

// Match user input string to RecommendedPlace if possible
export function findPlaceByName(name: string): RecommendedPlace | undefined {
    // Basic fuzzy search or exact match
    return RECOMMENDED_PLACES.find(p => p.name.includes(name));
}
