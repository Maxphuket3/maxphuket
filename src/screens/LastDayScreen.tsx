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
        <div className="estimate-result-page" style={{
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
                        className="kakao-connect-button"
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
