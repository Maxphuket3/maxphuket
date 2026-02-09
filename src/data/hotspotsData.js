export const hotspots = [
    // 1. Cafe Hopping (감성 카페)
    {
        id: 101,
        title: 'Ma Doo Bua Cafe',
        category: 'cafe',
        description: 'The ultimate Instagram spot with giant Victoria Amazonica lotus leaves. Drone photography service available.',
        image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        location: 'Thalang',
        googleMapLink: 'https://maps.app.goo.gl/MaDooBua',
        tips: 'Go before 11 AM for the best light & drone shots.'
    },
    {
        id: 102,
        title: 'Coming Home Cafe',
        category: 'cafe',
        description: 'Cozy, minimalist white cafe in Phuket Town using local coffee beans. Very chic.',
        image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        location: 'Phuket Town',
        googleMapLink: 'https://maps.app.goo.gl/ComingHome',
        tips: 'Try the Dirty Coffee.'
    },
    {
        id: 103,
        title: 'Moonstone Cafe',
        category: 'cafe',
        description: 'Hidden gem at the pier. Orange aesthetic with sea view, perfect for minimal photos.',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        location: 'Visit Panwa',
        googleMapLink: 'https://maps.app.goo.gl/Moonstone',
        tips: 'Outdoor seating offers the best breeze.'
    },

    // 2. Party & Beach Clubs (핫한 비치클럽)
    {
        id: 201,
        title: 'Yona Beach Club',
        category: 'party',
        description: 'The world\'s first floating beach club. A luxury oasis loop in the middle of the sea.',
        image: 'https://images.unsplash.com/photo-1544551763-77ef65893732?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        location: 'Patong / Royal Phuket Marina',
        googleMapLink: 'https://maps.app.goo.gl/YonaClub',
        tips: 'Booking is essential. Check departure pier.'
    },
    {
        id: 202,
        title: 'Catch Beach Club',
        category: 'party',
        description: 'The OG luxury beach club. glamorous white theme, fire shows, and top DJs.',
        image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        location: 'Bang Tao Beach',
        googleMapLink: 'https://maps.app.goo.gl/CatchBeach',
        tips: 'Friday night BBQ is legendary.'
    },

    // 3. Photo Spots (인생샷 명소)
    {
        id: 301,
        title: 'Mai Khao Plane Spotting',
        category: 'photo',
        description: 'Get a selfie with a landing plane just meters above your head.',
        image: 'https://images.unsplash.com/photo-1527685276677-789d7b420793?auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        location: 'Mai Khao Beach',
        googleMapLink: 'https://maps.app.goo.gl/MaiKhaoPlane',
        tips: 'Check flight schedule for landing direction.'
    },
    {
        id: 302,
        title: 'Soi Romanee',
        category: 'photo',
        description: 'Colorful Sino-Portuguese buildings. The most pink/vibrant street in Old Town.',
        image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        location: 'Old Town',
        googleMapLink: 'https://maps.app.goo.gl/SoiRomanee',
        tips: 'Match your outfit with the pink walls.'
    },
    {
        id: 303,
        title: 'Promthep Cape',
        category: 'photo',
        description: 'The classic sunset viewpoint. Iconic palm trees and ocean panorama.',
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        location: 'Rawai',
        googleMapLink: 'https://maps.app.goo.gl/Promthep',
        tips: 'Arrive by 5:30 PM for a good spot.'
    }
];

export const categories = [
    { id: 'all', name: '전체보기', icon: '✨' },
    { id: 'cafe', name: '감성 카페', icon: '☕' },
    { id: 'party', name: '비치클럽/파티', icon: '💃' },
    { id: 'photo', name: '인생샷 명소', icon: '📸' },
];
