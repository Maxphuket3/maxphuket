// Simulating Google Maps Distance Matrix and Place Details
// Since we don't have a real API key, this mock service provides estimated travel times
// and opening hours for our known hotspots.

import { hotspots } from '../data/hotspotsData';

// Average speed assumption: 30km/h in Phuket traffic
const AVG_SPEED_KMH = 30;

// Mock coordinates (approximations for demo)
const LOCATIONS = {
    // Restaurants
    'Tu Kab Khao': { lat: 7.883, lng: 98.392 }, // Old Town
    'Three Monkeys': { lat: 7.894, lng: 98.352 }, // Hanuman World

    // Clubs
    'Illuzion Phuket': { lat: 7.893, lng: 98.297 }, // Bangla Rd
    'Cafe Del Mar': { lat: 7.953, lng: 98.283 }, // Kamala
    'Yona Beach Club': { lat: 7.960, lng: 98.380 }, // Marina (Departure)
    'Catch Beach Club': { lat: 7.994, lng: 98.293 }, // Bang Tao

    // Cafes
    'Ma Doo Bua Cafe': { lat: 8.016, lng: 98.332 }, // Thalang
    'Coming Home Cafe': { lat: 7.880, lng: 98.390 }, // Old Town
    'Moonstone Cafe': { lat: 7.805, lng: 98.406 }, // Panwa

    // Photo Spots
    'Mai Khao Plane Spotting': { lat: 8.111, lng: 98.305 }, // Airport
    'Soi Romanee': { lat: 7.884, lng: 98.391 }, // Old Town
    'Promthep Cape': { lat: 7.763, lng: 98.306 }, // South Tip

    // Default for unknown
    'Patong Beach': { lat: 7.896, lng: 98.295 }
};

// Haversine formula to calculate distance
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat1)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

const deg2rad = (deg) => {
    return deg * (Math.PI / 180)
}

// Mock Opening Hours (24h format)
const OPENING_HOURS = {
    'Tu Kab Khao': { open: 11, close: 22 },
    'Three Monkeys': { open: 10, close: 22 },
    'Illuzion Phuket': { open: 21, close: 4 }, // 4 AM next day
    'Cafe Del Mar': { open: 12, close: 24 },
    'Yona Beach Club': { open: 12, close: 19 },
    'Ma Doo Bua Cafe': { open: 9, close: 18 },
    'Moonstone Cafe': { open: 8, close: 18 },
    'Mai Khao Plane Spotting': { open: 6, close: 18 }, // Daylight
    'Soi Romanee': { open: 0, close: 24 }, // Open street
    'Promthep Cape': { open: 0, close: 24 }, // Open viewpoint
};

export const mockMapsService = {
    // Get travel time and distance
    getTravelInfo: async (originName, destName) => {
        // Simulate API delay
        await new Promise(r => setTimeout(r, 100));

        const origin = LOCATIONS[originName] || LOCATIONS['Patong Beach'];
        const dest = LOCATIONS[destName] || LOCATIONS['Patong Beach'];

        const distanceKm = getDistanceFromLatLonInKm(origin.lat, origin.lng, dest.lat, dest.lng);
        // Factor in 1.5x for road vs line distance
        const roadDistanceKm = distanceKm * 1.5;
        const durationHours = roadDistanceKm / AVG_SPEED_KMH;
        const durationSec = Math.round(durationHours * 3600);

        return {
            distance: { text: `${roadDistanceKm.toFixed(1)} km`, value: roadDistanceKm * 1000 },
            duration: { text: `${Math.round(durationHours * 60)} mins`, value: durationSec }
        };
    },

    // Check if open at specific time
    isOpenAt: (placeName, dateObj) => {
        const hour = dateObj.getHours();
        const schedule = OPENING_HOURS[placeName];

        if (!schedule) return true; // Assume open if no data

        if (schedule.close < schedule.open) {
            // Late night spot (e.g. 21:00 to 04:00)
            return hour >= schedule.open || hour < schedule.close;
        } else {
            // Normal day spot
            return hour >= schedule.open && hour < schedule.close;
        }
    },

    getPlaceDetails: (placeName) => {
        return {
            opening_hours: OPENING_HOURS[placeName] || { open: 9, close: 22 }
        };
    }
};
