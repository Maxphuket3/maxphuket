import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../context/JourneyContext';
import { RecommendedPlace } from '../data/recommendedPlaces';
import { MOCK_DRIVER } from '../data/mockData';
import { PHUKET_HOTELS } from '../data/hotels';
import { MessageCircle, Clock, MapPin, AlertTriangle, ArrowDown } from 'lucide-react';

// --- Types ---
interface ItineraryItem {
    id: string;
    type: 'START' | 'STOP' | 'END';
    name: string;
    category?: string;
    arrivalTime: string; // HH:mm
    departureTime: string; // HH:mm
    durationMin: number; // Stay duration
    travelTimeMin: number; // Time to get here from prev
    isLate?: boolean; // If arrival > deadline
    lat: number;
    lng: number;
}

// --- Helpers ---
const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const addMinutes = (timeStr: string, minutes: number): string => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m + minutes, 0, 0);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

const timeDiffParam = (timeStr: string) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

const getCategoryDuration = (cat?: string) => {
    if (!cat) return 60;
    if (['RESTAURANT', 'CAFE', 'NIGHTMARKET'].includes(cat)) return 90;
    if (['VIEW'].includes(cat)) return 40;
    if (['SPA', 'SHOW', 'EXTREME', 'MALL'].includes(cat)) return 120; // 2 hours
    return 60;
};

const LastDayScreen: React.FC = () => {
    const navigate = useNavigate();
    const { userInfo, selectedPlaces } = useJourney();

    // --- State ---
    const [startTime, setStartTime] = useState('12:00');
    const [airportDeadline, setAirportDeadline] = useState('21:00'); // Default deadline
    const [calculatedRoute, setCalculatedRoute] = useState<ItineraryItem[]>([]);
    const [isOverTime, setIsOverTime] = useState(false);

    // --- Logic: 1. Setup Start/End ---
    const matchedHotel = PHUKET_HOTELS.find(h =>
        userInfo.resort && (
            userInfo.resort === `${h.nameKo} (${h.nameEn})` ||
            userInfo.resort.includes(h.nameEn) ||
            userInfo.resort.includes(h.nameKo)
        )
    );

    const startLocation = useMemo(() => ({
        id: 'start',
        name: userInfo.resort || '호텔 (출발)',
        lat: matchedHotel ? matchedHotel.lat : 7.89, // Default Patong
        lng: matchedHotel ? matchedHotel.lng : 98.29
    }), [userInfo.resort, matchedHotel]);

    const endLocation = useMemo(() => ({
        id: 'end',
        name: `푸켓 국제공항 (${userInfo.flight || 'Departure'})`,
        lat: 8.1132,
        lng: 98.3169
    }), [userInfo.flight]);


    // --- Logic: 2. Core Optimization (Far-to-Near) ---
    useEffect(() => {
        if (selectedPlaces.length === 0) {
            // No places selected, just Start -> End
            const travelKm = getDistance(startLocation.lat, startLocation.lng, endLocation.lat, endLocation.lng);
            const travelMin = Math.round((travelKm / 30) * 60); // 30km/h avg

            setCalculatedRoute([
                {
                    id: 'start', type: 'START', name: startLocation.name,
                    arrivalTime: startTime, departureTime: startTime,
                    durationMin: 0, travelTimeMin: 0, lat: startLocation.lat, lng: startLocation.lng
                },
                {
                    id: 'end', type: 'END', name: endLocation.name,
                    arrivalTime: addMinutes(startTime, travelMin), departureTime: addMinutes(startTime, travelMin),
                    durationMin: 0, travelTimeMin: travelMin, lat: endLocation.lat, lng: endLocation.lng,
                    isLate: timeDiffParam(addMinutes(startTime, travelMin)) > timeDiffParam(airportDeadline)
                }
            ]);
            return;
        }

        // 1. Find Farthest from Hotel
        let remaining = [...selectedPlaces];
        let ordered: RecommendedPlace[] = [];

        // Simple calc helper
        const distFrom = (from: { lat: number, lng: number }, users: RecommendedPlace[]) => {
            return users.map(p => ({
                place: p,
                dist: getDistance(from.lat, from.lng, p.lat, p.lng)
            })).sort((a, b) => b.dist - a.dist); // Descending
        };

        // Step 1: Farthest
        const farthest = distFrom(startLocation, remaining)[0].place;
        ordered.push(farthest);
        remaining = remaining.filter(p => p.id !== farthest.id);

        // Step 2: Nearest Neighbors
        let current = farthest;
        while (remaining.length > 0) {
            const nearest = remaining.map(p => ({
                place: p,
                dist: getDistance(current.lat, current.lng, p.lat, p.lng)
            })).sort((a, b) => a.dist - b.dist)[0].place; // Ascending

            ordered.push(nearest);
            remaining = remaining.filter(p => p.id !== nearest.id);
            current = nearest;
        }

        // 3. Build Timeline
        let currentTime = startTime;
        let routeResult: ItineraryItem[] = [];

        // A. Start Node
        routeResult.push({
            id: 'start', type: 'START', name: startLocation.name,
            arrivalTime: currentTime, departureTime: currentTime,
            durationMin: 0, travelTimeMin: 0, lat: startLocation.lat, lng: startLocation.lng
        });

        let prevLoc = startLocation;

        // B. Stops
        ordered.forEach(place => {
            // Travel Time Calc
            const km = getDistance(prevLoc.lat, prevLoc.lng, place.lat, place.lng);

            // Traffic Weight (16:00 - 19:00 = 1.5x)
            const [curH] = currentTime.split(':').map(Number);
            let speed = 30; // km/h
            if (curH >= 16 && curH <= 19) speed = 20; // Slower due to traffic

            const travelMin = Math.round((km / speed) * 60);
            const arrival = addMinutes(currentTime, travelMin);

            // Stay Duration
            const stayMin = getCategoryDuration(place.category);
            const departure = addMinutes(arrival, stayMin);

            routeResult.push({
                id: place.id,
                type: 'STOP',
                name: place.name,
                category: place.category,
                arrivalTime: arrival,
                departureTime: departure,
                durationMin: stayMin,
                travelTimeMin: travelMin,
                lat: place.lat,
                lng: place.lng
            });

            currentTime = departure;
            prevLoc = place;
        });

        // C. End Node (Airport)
        const kmToEnd = getDistance(prevLoc.lat, prevLoc.lng, endLocation.lat, endLocation.lng);
        const [curH] = currentTime.split(':').map(Number);
        const finalSpeed = (curH >= 16 && curH <= 19) ? 20 : 35; // Faster to airport usually, but check traffic
        const toAirportMin = Math.round((kmToEnd / finalSpeed) * 60);
        const finalArrival = addMinutes(currentTime, toAirportMin);

        const isLate = timeDiffParam(finalArrival) > timeDiffParam(airportDeadline);
        setIsOverTime(isLate);

        routeResult.push({
            id: 'end',
            type: 'END',
            name: endLocation.name,
            arrivalTime: finalArrival,
            departureTime: finalArrival,
            durationMin: 0,
            travelTimeMin: toAirportMin,
            lat: endLocation.lat,
            lng: endLocation.lng,
            isLate: isLate
        });

        setCalculatedRoute(routeResult);

    }, [selectedPlaces, startTime, airportDeadline, startLocation, endLocation]);


    // --- Render ---
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
            color: '#fff',
            paddingBottom: '120px',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Nav */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => navigate('/select')} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer' }}>
                    <ArrowDown style={{ transform: 'rotate(90deg)' }} /> Back
                </button>
                <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>MY TRIP PLAN</div>
                <div style={{ width: '24px' }}></div>
            </div>

            {/* Header / Driver Info */}
            <div style={{ padding: '0 20px', textAlign: 'center', marginBottom: '30px' }}>
                <h1 style={{ fontSize: '1.8rem', color: '#D4AF37', margin: '0 0 10px 0', fontWeight: 800 }}>PHUKET LAST DAY</h1>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>AI가 최적화한 당신만의 일정입니다.</p>

                {/* Driver Card */}
                <div style={{
                    marginTop: '20px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '16px',
                    padding: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    border: '1px solid rgba(212, 175, 55, 0.2)'
                }}>
                    <img src={MOCK_DRIVER.photoUrl} alt="Driver" style={{ width: '60px', height: '60px', borderRadius: '50%', border: '2px solid #D4AF37' }} />
                    <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>{MOCK_DRIVER.name} 기사님</div>
                        <div style={{ fontSize: '0.85rem', color: '#ccc' }}>{MOCK_DRIVER.vehicleType} | {MOCK_DRIVER.vehicleNumber}</div>
                    </div>
                    <button
                        onClick={() => window.open(MOCK_DRIVER.lineLink || 'https://line.me/ti/p/20KIvNskSv', '_blank')}
                        style={{
                            background: '#06C755', color: '#fff', border: 'none', borderRadius: '50%',
                            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                        }}>
                        <MessageCircle size={20} />
                    </button>
                </div>
            </div>

            {/* Constraints Controls */}
            <div style={{ padding: '0 20px 20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#D4AF37', marginBottom: '4px', textAlign: 'center' }}>호텔 출발</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{
                            background: '#2d3748', border: '1px solid #555', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', outline: 'none'
                        }}
                    />
                </div>
                <div style={{ position: 'relative' }}>
                    <label style={{ display: 'block', fontSize: '0.7rem', color: '#D4AF37', marginBottom: '4px', textAlign: 'center' }}>공항 도착 데드라인</label>
                    <input
                        type="time"
                        value={airportDeadline}
                        onChange={(e) => setAirportDeadline(e.target.value)}
                        style={{
                            background: '#2d3748', border: '1px solid #555', color: '#fff', padding: '8px 12px', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', outline: 'none'
                        }}
                    />
                </div>
            </div>

            {/* Error Message */}
            {isOverTime && (
                <div style={{
                    margin: '0 20px 20px', padding: '15px', background: 'rgba(220, 38, 38, 0.2)',
                    border: '1px solid #dc2626', borderRadius: '12px', color: '#fca5a5',
                    display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem'
                }}>
                    <AlertTriangle size={20} />
                    <div>
                        <strong>시간 초과!</strong><br />
                        공항 도착 시간이 늦어집니다. 장소를 줄이거나 출발 시간을 당기세요.
                    </div>
                </div>
            )}

            {/* Timeline UI */}
            <div style={{
                position: 'relative',
                padding: '20px',
                maxWidth: '600px',
                margin: '0 auto',
                textAlign: 'center'
            }}>
                {/* Vertical Line */}
                <div style={{
                    position: 'absolute',
                    top: '40px', bottom: '40px', left: '50%', width: '2px',
                    background: 'repeating-linear-gradient(to bottom, #D4AF37 0, #D4AF37 4px, transparent 4px, transparent 8px)',
                    transform: 'translateX(-50%)',
                    zIndex: 0
                }}></div>

                {calculatedRoute.map((item, idx) => {
                    const isLeft = idx % 2 === 0;
                    const isStart = item.type === 'START';
                    const isEnd = item.type === 'END';

                    let icon = '📍';
                    if (isStart) icon = '🏨';
                    else if (isEnd) icon = '✈️';
                    else if (['RESTAURANT', 'CAFE'].includes(item.category || '')) icon = '🍽️';
                    else if (item.category === 'VIEW') icon = '📸';
                    else if (item.category === 'SPA') icon = '💆';
                    else if (item.category === 'KIDS') icon = '🧸';

                    return (
                        <div key={item.id} style={{
                            position: 'relative',
                            marginBottom: '40px',
                            zIndex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            {/* Time Badge (Mobile Center) */}
                            <div style={{
                                background: isEnd && (item.isLate) ? '#dc2626' : '#2d3748',
                                padding: '4px 12px',
                                borderRadius: '20px',
                                border: `1px solid ${isEnd && item.isLate ? '#fca5a5' : '#D4AF37'}`,
                                fontSize: '0.9rem',
                                marginBottom: '10px',
                                fontWeight: 'bold',
                                color: '#fff',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                            }}>
                                {item.arrivalTime}
                            </div>

                            {/* Icon Bubble */}
                            <div style={{
                                width: '50px', height: '50px',
                                background: isStart ? '#D4AF37' : '#1a202c',
                                border: '3px solid #D4AF37',
                                borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.5rem',
                                boxShadow: '0 0 15px rgba(212, 175, 55, 0.3)',
                                marginBottom: '10px'
                            }}>
                                {icon}
                            </div>

                            {/* Content Card (Centered) */}
                            <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(5px)',
                                padding: '15px 20px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                maxWidth: '280px',
                                width: '100%',
                                textAlign: 'center'
                            }}>
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '4px', color: '#fff' }}>{item.name}</div>
                                {item.durationMin > 0 && (
                                    <div style={{ fontSize: '0.85rem', color: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                                        <Clock size={14} /> 체류 {item.durationMin}분
                                    </div>
                                )}
                                {item.travelTimeMin > 0 && (
                                    <div style={{ fontSize: '0.8rem', color: '#D4AF37', marginTop: '6px', fontWeight: 600 }}>
                                        ↓ 이동 {item.travelTimeMin}분 {(() => {
                                            const [h] = item.arrivalTime.split(':').map(Number);
                                            return (h >= 16 && h <= 18) ? '(교통체증 🔥)' : '';
                                        })()}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Action */}
            {!isOverTime ? (
                <div style={{ position: 'fixed', bottom: '20px', left: '0', right: '0', padding: '20px', textAlign: 'center', zIndex: 100 }}>
                    <button
                        onClick={() => {
                            const message = `[Phuket Last Day Plan]\nRoute: ${calculatedRoute.map(i => i.name).join(' -> ')}\nTotal Est. Time: ${calculatedRoute[calculatedRoute.length - 1].arrivalTime}`;
                            navigator.clipboard.writeText(message);
                            alert('일정이 복사되었습니다! 카카오톡 상담으로 이동합니다.');
                            window.open('http://pf.kakao.com/_rxbHRX', '_blank');
                        }}
                        style={{
                            background: '#D4AF37', color: '#000', border: 'none',
                            padding: '16px 32px', borderRadius: '50px',
                            fontSize: '1.1rem', fontWeight: 'bold',
                            boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)',
                            cursor: 'pointer'
                        }}>
                        이 일정으로 예약 상담하기
                    </button>
                </div>
            ) : (
                <div style={{ position: 'fixed', bottom: '20px', left: '0', right: '0', padding: '20px', textAlign: 'center', zIndex: 100 }}>
                    <button disabled style={{
                        background: '#555', color: '#888', border: 'none',
                        padding: '16px 32px', borderRadius: '50px',
                        fontSize: '1.1rem', fontWeight: 'bold'
                    }}>
                        시간 초과 (예약 불가)
                    </button>
                </div>
            )}
        </div>
    );
};

export default LastDayScreen;

// Interfaces
interface ItineraryItem {
    time: string;
    icon: string;
    title: string;
    duration: string;
    lat: number;
    lng: number;
    googleMapsUrl?: string;
}

const LastDayScreen: React.FC = () => {
    const navigate = useNavigate();
    // Refs & State


    // Context
    const { userInfo, selectedPlaces } = useJourney();

    // --- LOGIC START ---

    // 1. Prepare places (Fallback if empty)
    const rawPlaces = selectedPlaces.length > 0 ? selectedPlaces : [
        { id: 'o1', name: 'Phuket Old Town', category: 'OLDTOWN', lat: 7.8845, lng: 98.3895 },
        { id: 'v1', name: 'Khao Rang Hill View Point', category: 'VIEW', lat: 7.8933, lng: 98.3799 },
        { id: 'r2', name: 'Three Monkeys Restaurant', category: 'RESTAURANT', lat: 7.8910, lng: 98.3410 }
    ] as RecommendedPlace[];

    // Find matching hotel coordinates
    const matchedHotel = PHUKET_HOTELS.find(h =>
        userInfo.resort && (
            userInfo.resort === `${h.nameKo} (${h.nameEn})` ||
            userInfo.resort.includes(h.nameEn) ||
            userInfo.resort.includes(h.nameKo)
        )
    );

    // 2. Define Start & End
    const startPlace = {
        name: `[Pickup] ${userInfo.resort || 'Hotel'}`,
        lat: matchedHotel ? matchedHotel.lat : 7.82,
        lng: matchedHotel ? matchedHotel.lng : 98.30,
        googleMapsUrl: ''
    };
    const endPlace = {
        name: `[Dropoff] Airport (${userInfo.flight || 'HQT'})`,
        lat: 8.1132,
        lng: 98.3169,
        googleMapsUrl: ''
    };

    // 3. Optimize (Inline Sort) - South to North
    // This strictly sorts by latitude to create a South -> North flow.
    const middlePlaces = [...rawPlaces].sort((a, b) => a.lat - b.lat);
    const orderedPath = [startPlace, ...middlePlaces, endPlace];

    // 4. Create Itinerary Items
    const itinerary: ItineraryItem[] = orderedPath.map((p, idx) => {
        let icon = '📍';
        let timeLabel = '';

        if (idx === 0) {
            icon = '🏨';
            timeLabel = '12:00 PM';
        } else if (idx === orderedPath.length - 1) {
            icon = '✈️';
            timeLabel = '19:00 PM';
        } else {
            // Rough time calc
            const h = 12 + idx;
            timeLabel = `${h > 12 ? h - 12 : h}:00 PM`;

            // Icon logic from category (safe check)
            const cat = (p as any).category; // 'p' might be simple object for start/end
            if (cat === 'RESTAURANT') icon = '🍽️';
            else if (cat === 'CAFE') icon = '☕';
            else if (cat === 'SPA') icon = '💆';
            else if (cat === 'VIEW') icon = '📸';
            else if (cat === 'MALL' || cat === 'SHOPPING' || cat === 'NIGHTMARKET') icon = '🛍️';
            else if (cat === 'OLDTOWN') icon = '🏛️';
            else if (cat === 'KIDS') icon = '🧸';
        }

        return {
            time: timeLabel,
            icon,
            title: p.name,
            duration: (idx === 0 || idx === orderedPath.length - 1) ? '0 min' : '60 mins',
            lat: p.lat,
            lng: p.lng,
            googleMapsUrl: p.googleMapsUrl
        };
    });

    // --- EFFECTS ---

    // Map Init


    // Draw Route


    // --- RENDER ---
    return (
        <div style={{
            minHeight: '100vh',
            background: '#1a202c', // Fallback color
            backgroundImage: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
            color: '#fff',
            paddingBottom: '100px',
            overflowX: 'hidden',
            position: 'relative'
        }}>
            {/* Back Button */}
            <button
                onClick={() => navigate('/select')}
                style={{
                    position: 'fixed', // Fixed to keep it visible on scroll
                    top: '20px',
                    left: '20px',
                    zIndex: 9999,
                    background: 'rgba(0,0,0,0.6)',
                    border: '1px solid rgba(212, 175, 55, 0.5)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#D4AF37',
                    backdropFilter: 'blur(4px)',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Header */}
            <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                    PHUKET <span style={{ color: '#D4AF37' }}>LASTDAY</span>
                </h1>
                <p style={{ color: '#aaa', marginTop: '10px' }}>대표님만을 위한 맞춤 일정표</p>
            </div>

            {/* Status Bar */}
            <div style={{
                background: 'rgba(212, 175, 55, 0.1)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
                padding: '12px 20px',
                textAlign: 'center',
                color: '#D4AF37',
                fontSize: '0.95rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
            }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px #10B981' }}></div>
                {MOCK_DRIVER.status === 'ASSIGNED' ? '전담 기사님이 배정되었습니다 (Driver Assigned)' : '기사님이 이동 중입니다'}
            </div>

            {/* Map Section - FORCED HEIGHT */}
            <div style={{
                maxWidth: '1200px',
                margin: '20px auto 40px',
                padding: '0 20px',
                position: 'relative',
                zIndex: 1
            }}>
                {/* My Driver Section */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '20px',
                    padding: '20px',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}>
                    <div style={{ position: 'relative' }}>
                        <img
                            src={MOCK_DRIVER.photoUrl}
                            alt={MOCK_DRIVER.name}
                            style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                border: '3px solid #D4AF37',
                                objectFit: 'cover'
                            }}
                        />
                        <div style={{
                            position: 'absolute',
                            bottom: '0',
                            right: '0',
                            background: '#D4AF37',
                            color: '#000',
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '10px'
                        }}>
                            VIP
                        </div>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{ margin: '0 0 5px 0', color: '#fff', fontSize: '1.2rem' }}>{MOCK_DRIVER.name}</h3>
                        <p style={{ margin: 0, color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{MOCK_DRIVER.vehicleType}</p>
                        <p style={{ margin: '4px 0 0 0', color: '#D4AF37', fontSize: '1rem', fontWeight: 700, letterSpacing: '1px' }}>Car No. {MOCK_DRIVER.vehicleNumber}</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <button style={{
                            background: '#06C755', // LINE Green
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 2px 8px rgba(6, 199, 85, 0.3)'
                        }} onClick={() => window.open(MOCK_DRIVER.lineLink || 'https://line.me/ti/p/20KIvNskSv', '_blank')}>
                            <MessageCircle size={14} fill="currentColor" />
                            기사님과 채팅하기
                        </button>
                        <button style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <MapPin size={14} />
                            위치 확인
                        </button>
                    </div>
                </div>

                <div style={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    background: '#2d3748'
                }}>
                    <MapContainer
                        center={[7.98, 98.36]}
                        zoom={10}
                        style={{ width: '100%', height: '500px', background: '#2d3748' }}
                        zoomControl={false}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        />
                        <Polyline
                            positions={itinerary.map(item => [item.lat, item.lng])} // Extract lat, lng from itinerary items
                            color="#D4AF37"
                            weight={4}
                            opacity={0.8}
                        />
                        {itinerary.map((item, idx) => (
                            <Marker
                                key={idx}
                                position={[item.lat, item.lng]}
                                icon={L.divIcon({
                                    className: 'custom-icon', // Use custom class for styling if needed, or inline style in HTML
                                    html: `<div style="background-color: #D4AF37; width: 12px; height: 12px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px #D4AF37;"></div>`,
                                    iconSize: [12, 12],
                                    iconAnchor: [6, 6]
                                })}
                            >
                                <Popup>
                                    <div style={{ color: '#333', textAlign: 'center', fontFamily: 'sans-serif' }}>
                                        <strong style={{ fontSize: '14px' }}>{item.title}</strong><br />
                                        <span style={{ fontSize: '12px', color: '#666' }}>{item.time}</span>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>

            {/* LINE Floating Button (Primary Channel) */}
            <button
                onClick={() => window.open('https://line.me/ti/p/20KIvNskSv', '_blank')}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 999,
                    background: '#06C755', // LINE Green
                    color: '#fff',
                    border: '1px solid #D4AF37', // Gold border for luxury feel
                    borderRadius: '50px',
                    padding: '12px 24px',
                    fontWeight: 800,
                    fontSize: '1rem',
                    boxShadow: '0 4px 20px rgba(6, 199, 85, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    animation: 'pulse 2s infinite'
                }}
            >
                <MessageCircle size={20} fill="currentColor" />
                LINE 실시간 상담
            </button>
            <style>{`
                @keyframes pulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(6, 199, 85, 0.7); }
                    70% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(6, 199, 85, 0); }
                    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(6, 199, 85, 0); }
                }
            `}</style>

            {/* Itinerary Timeline */}
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
                <h3 style={{ color: '#D4AF37', borderBottom: '1px solid #D4AF37', paddingBottom: '10px', marginBottom: '20px' }}>
                    상세 일정 (Itinerary)
                </h3>
                {itinerary.map((item, idx) => (
                    <div key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '15px',
                        background: 'rgba(255,255,255,0.05)',
                        marginBottom: '10px',
                        borderRadius: '12px'
                    }}>
                        <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>{item.icon}</span>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', color: '#D4AF37' }}>{item.time}</div>
                            <div style={{ fontSize: '1.1rem' }}>{item.title}</div>

                            {/* Google Map Link */}
                            {item.googleMapsUrl && (
                                <a
                                    href={item.googleMapsUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'inline-block',
                                        marginTop: '4px',
                                        fontSize: '0.75rem',
                                        color: '#D4AF37',
                                        textDecoration: 'none',
                                        border: '1px solid rgba(212, 175, 55, 0.4)',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        transition: 'all 0.2s',
                                        opacity: 0.8
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                                    onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
                                >
                                    Google Map 🗺️
                                </a>
                            )}
                        </div>
                        <div style={{ color: '#888', fontSize: '0.9rem' }}>{item.duration}</div>
                    </div>
                ))}
            </div>

            {/* Luxury Estimate Section */}
            <div style={{
                maxWidth: '600px',
                margin: '40px auto',
                padding: '25px',
                background: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
                borderRadius: '20px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                color: '#fff',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Shine */}
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />

                <h3 style={{
                    textAlign: 'center',
                    color: '#D4AF37',
                    margin: '0 0 20px',
                    fontSize: '1.5rem',
                    letterSpacing: '1px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    paddingBottom: '15px'
                }}>
                    최종 예상 견적 (TOTAL ESTIMATE)
                </h3>

                {/* Advanced Luxury Calculation Logic */}
                {(() => {
                    // --- CONSTANTS & RATES ---
                    // 1. Pax Vehicle Logic
                    const pax = userInfo.personCount || 2;
                    const isVan = userInfo.vehicleType === 'VAN';
                    const vehicleLabel = isVan ? 'VIP Van (최대 11인)' : 'Private Sedan (최대 3인)';

                    // 2. Duration Calc (Heuristic: 2 hours per place + 1 hour buffer, Min 5 hours)
                    const estimatedHours = Math.max(5, (selectedPlaces.length * 2) + 1);

                    // 3. Rate Table Implementation
                    const calculateVehiclePrice = (isVan: boolean, hours: number) => {
                        // Rate Definitions
                        const carRates = [
                            { h: 5, p: 1700 }, { h: 6, p: 1900 }, { h: 10, p: 2500 }, { h: 12, p: 3000 }
                        ];
                        const vanRates = [
                            { h: 5, p: 1900 }, { h: 6, p: 2100 }, { h: 10, p: 2700 }, { h: 12, p: 3100 }
                        ];

                        const rates = isVan ? vanRates : carRates;

                        // Find optimal price
                        let bestPrice = Infinity;

                        rates.forEach(r => {
                            if (hours <= r.h) {
                                if (r.p < bestPrice) bestPrice = r.p;
                            }
                        });

                        // Fallback logic for longer hours (add 200 per hour)
                        if (bestPrice === Infinity) {
                            const maxRate = rates[rates.length - 1];
                            const extraHours = hours - maxRate.h;
                            bestPrice = maxRate.p + (extraHours * 200);
                        }

                        return bestPrice;
                    };

                    const vehiclePrice = calculateVehiclePrice(isVan, estimatedHours);

                    // 4. Surcharge Logic
                    // Entrance Fees
                    const entranceFees = selectedPlaces.reduce((sum, p) => sum + (p.price || 0), 0) * pax;

                    // Region Surcharge (North/Airport)
                    let regionSurcharge = 0;
                    if (middlePlaces.some(p => p.lat > 8.05)) { // North of Boat Avenue
                        regionSurcharge += 300;
                    }
                    if (middlePlaces.some(p => p.name.includes('Airport') || p.name.includes('Mai Khao'))) {
                        regionSurcharge = 500; // Max surcharge if airport area involved in tour
                    }

                    // Late Night Surcharge
                    const lateNightSurcharge = 0; // Simplified for now (can be adding 200 if ends after 23:00)

                    const totalEstimate = vehiclePrice + entranceFees + regionSurcharge + lateNightSurcharge;

                    // Message for Kakao
                    const message = `[Phuket Last Day Quote]\n` +
                        `Name: ${userInfo.name}\nPax: ${pax} (${vehicleLabel})\n` +
                        `Route: ${middlePlaces.map(p => p.name).join(' -> ')}\n` +
                        `Duration: ${estimatedHours}h\n` +
                        `Breakdown: Car ${vehiclePrice} + Ent ${entranceFees} + Sur ${regionSurcharge + lateNightSurcharge}\n` +
                        `TOTAL: ${totalEstimate.toLocaleString()} THB`;

                    return (
                        <>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '15px', fontSize: '1rem', position: 'relative', zIndex: 1 }}>
                                <div style={{ color: '#ccc' }}>차량 비용 ({vehicleLabel})</div>
                                <div style={{ fontWeight: 'bold' }}>{vehiclePrice.toLocaleString()} THB</div>

                                <div style={{ color: '#ccc' }}>예상 입장료 (현장 지불)</div>
                                <div style={{ fontWeight: 'bold' }}>{entranceFees > 0 ? entranceFees.toLocaleString() : '0'} THB</div>

                                <div style={{ color: '#ccc' }}>지역 추가 운임 (공항/북부)</div>
                                <div style={{ fontWeight: 'bold' }}>{regionSurcharge > 0 ? regionSurcharge.toLocaleString() : '0'} THB</div>

                                <div style={{ color: '#ccc' }}>심야 할증 (23시 이후)</div>
                                <div style={{ fontWeight: 'bold' }}>{lateNightSurcharge > 0 ? lateNightSurcharge.toLocaleString() : '0'} THB</div>
                            </div>

                            <div style={{
                                marginTop: '20px',
                                paddingTop: '20px',
                                borderTop: '1px solid rgba(255,255,255,0.2)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                position: 'relative', zIndex: 1
                            }}>
                                <div style={{ fontSize: '1.1rem', color: '#D4AF37' }}>최종 예상 견적</div>
                                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#D4AF37' }}>{totalEstimate.toLocaleString()} THB</div>
                            </div>


                            <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', fontSize: '0.9rem', color: '#aaa', lineHeight: '1.6', position: 'relative', zIndex: 1 }}>
                                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                                    <li>본 투어는 단독 차량으로 진행되며, 전담 기사님이 안전한 이동을 도와드립니다 (가이드 미포함).</li>
                                    <li>예상 입장료 및 식비는 현장에서 직접 결제해주시면 됩니다.</li>
                                    <li>교통 상황이나 현지 사정에 따라 소요 시간은 달라질 수 있습니다.</li>
                                    <li>카시트 설치가 어려울 수 있으니 양해 부탁드립니다. (공간 협소 등)</li>
                                    <li style={{ color: '#06C755', fontWeight: 'bold', marginTop: '8px' }}>
                                        기사님과의 소통이나 일정 변경 문의는 라인으로 연락 주시면 가장 빠릅니다.
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(message).then(() => {
                                        alert("Quote copied! Sending to KakaoTalk...");
                                        window.open('http://pf.kakao.com/_rxbHRX', '_blank');
                                    });
                                }}
                                style={{
                                    marginTop: '20px',
                                    width: '100%',
                                    padding: '16px',
                                    background: '#FEE500',
                                    color: '#000000',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'transform 0.2s',
                                    boxShadow: '0 4px 15px rgba(254, 229, 0, 0.3)'
                                }}
                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 3C6.48 3 2 6.48 2 10.76C2 13.54 3.79 16.03 6.54 17.38L5.64 20.65C5.55 20.97 5.92 21.22 6.2 21.03L9.89 18.59C10.57 18.7 11.27 18.76 12 18.76C17.52 18.76 22 15.28 22 11C22 6.48 17.52 3 12 3Z" />
                                </svg>
                                카카오톡으로 상담하기
                            </button>
                            <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#aaa', marginTop: '8px' }}>
                                상세 상담 후 최종 바우처가 발행됩니다
                            </p>
                        </>
                    );
                })()}
            </div>

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '80px', padding: '20px', color: '#666' }}>
                <p>Need Help? Contact Support</p>
            </div>
        </div>
    );
};

export default LastDayScreen;
