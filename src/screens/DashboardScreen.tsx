import React, { useState, useEffect, useRef } from 'react';
import { Itinerary, ItineraryItem, Spot } from '../types';
import { Clock, ArrowRight, Plus, ChevronLeft, ChevronRight, Share2 } from 'lucide-react';
import { RECOMMENDED_PLACES, CATEGORY_TABS } from '../data/recommendedPlaces';

declare global {
    interface Window {
        google: any;
        initPhuketMapEngine: any;
    }
}

const DashboardScreen: React.FC<{
    itinerary: Itinerary;
    onSpotClick: (spot: Spot) => void;
    onUpdateItinerary?: (newItinerary: Itinerary) => void;
}> = ({ itinerary, onSpotClick, onUpdateItinerary }) => {
    // 1. 상태 관리
    const [currentItinerary, setCurrentItinerary] = useState<Itinerary>(() => {
        const hotelItem = itinerary.items.find(item => item.spot.id === 'starting-hotel');
        const baseDate = new Date();
        baseDate.setHours(12, 0, 0, 0);

        if (hotelItem) {
            return {
                ...itinerary,
                items: [{
                    ...hotelItem,
                    arrival_time: baseDate,
                    duration: 0,
                    departure_time: baseDate
                }]
            };
        }
        return itinerary;
    });

    const [activeTab, setActiveTab] = useState(CATEGORY_TABS[0].id);
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const [flightNumber, setFlightNumber] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // 2. 거리 및 시간 계산 엔진
    const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const getStayTime = (category: string) => {
        switch (category) {
            case 'VIEW': case 'MARINA': return 40;
            case 'RESTAURANT': case 'CAFE': case 'KOREAN': return 80;
            default: return 120;
        }
    };

    // 3. Google Maps 로직
    useEffect(() => {
        (window as any).initPhuketMapEngine = () => setGoogleMapsLoaded(true);
        if (window.google && window.google.maps) { setGoogleMapsLoaded(true); return; }
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?callback=initPhuketMapEngine`;
        script.async = true; script.defer = true;
        document.head.appendChild(script);
    }, []);

    useEffect(() => {
        if (googleMapsLoaded && mapRef.current && !mapInstance.current) {
            mapInstance.current = new window.google.maps.Map(mapRef.current, {
                center: { lat: 7.92, lng: 98.35 },
                zoom: 10.8,
                mapTypeId: 'terrain',
                styles: [
                    { "elementType": "geometry", "stylers": [{ "color": "#1a1d26" }] },
                    { "featureType": "water", "stylers": [{ "color": "#0d111a" }] },
                    { "featureType": "road", "stylers": [{ "color": "#2a2d38" }] },
                    { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#D4AF37" }, { "weight": 0.5 }] }
                ],
                disableDefaultUI: true, gestureHandling: 'none', zoomControl: false, scrollwheel: false,
            });
        }
    }, [googleMapsLoaded]);

    const mapCoord = (lat: number, lng: number) => {
        const lngMin = 98.2, lngMax = 98.5, latMin = 7.7, latMax = 8.2;
        return { x: ((lng - lngMin) / (lngMax - lngMin)) * 100, y: 100 - ((lat - latMin) / (latMax - latMin)) * 100 };
    };

    const addPlaceToItinerary = (place: any) => {
        if (isConfirmed) return;
        const lastItem = currentItinerary.items[currentItinerary.items.length - 1];
        const distance = lastItem ? getDistance(lastItem.spot.lat, lastItem.spot.lng, place.lat, place.lng) : 0;
        const travelTimeMinutes = Math.max(15, Math.round((distance / 35) * 60));
        const arrivalTime = new Date(lastItem.departure_time.getTime() + travelTimeMinutes * 60000);
        const stayDuration = getStayTime(place.category);
        const departureTime = new Date(arrivalTime.getTime() + stayDuration * 60000);

        const newSpot: Spot = {
            id: `added-${Date.now()}`, name: place.name, category: place.category,
            area: 'Selected', lat: place.lat, lng: place.lng,
            open: '09:00', close: '21:00', duration: stayDuration, price: 0, voucher: false, luxury_level: 5,
            images: [place.image || 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b'],
            googleMapUrl: place.googleMapsUrl
        };

        const newItem: ItineraryItem = { spot: newSpot, arrival_time: arrivalTime, duration: stayDuration, departure_time: departureTime };
        setCurrentItinerary({ ...currentItinerary, items: [...currentItinerary.items, newItem] });
    };

    const getCurvePath = () => {
        if (currentItinerary.items.length < 2) return "";
        const points = currentItinerary.items.map(item => mapCoord(item.spot.lat, item.spot.lng));
        let path = `M ${points[0].x},${points[0].y}`;
        for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i], p1 = points[i + 1];
            const cpX = (p0.x + p1.x) / 2 + (p1.y - p0.y) * 0.1, cpY = (p0.y + p1.y) / 2 - (p1.x - p0.x) * 0.1;
            path += ` Q ${cpX},${cpY} ${p1.x},${p1.y}`;
        }
        return path;
    };

    // 4. 슬라이더 제어 (자동 + 수동)
    const scrollSlider = (direction: 'left' | 'right') => {
        if (sliderRef.current) {
            const scrollAmount = 400;
            sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#05070A', color: '#fff', padding: '80px 0 250px 0', fontFamily: "'Outfit', sans-serif" }}>

            {/* 1. Header (시안 100% 동일) */}
            <div style={{ textAlign: 'center', marginBottom: '70px' }}>
                <div style={{ display: 'inline-block', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ fontSize: '4.8rem', fontWeight: 950, letterSpacing: '-5px', margin: 0, lineHeight: 0.9 }}>PHUKET</h1>
                        <span style={{ fontSize: '4.8rem', fontWeight: 200, color: '#D4AF37', letterSpacing: '5px', margin: '0 0 0 15px' }}>LASTDAY</span>
                        <div style={{ marginLeft: '15px' }}><ArrowRight style={{ color: '#D4AF37', transform: 'rotate(-45deg)' }} size={55} /></div>
                    </div>
                </div>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1.4rem', letterSpacing: '3px', fontWeight: 500, marginTop: '15px' }}>Maximize Your Island Farewell.</p>
            </div>

            {/* 2. Main Itinerary Board */}
            <div style={{ maxWidth: '1050px', margin: '0 auto', padding: '0 20px' }}>
                {/* 2-1. Map Card */}
                <div style={{ height: '480px', position: 'relative', background: '#0e111a', borderRadius: '45px', border: '1px solid rgba(212, 175, 55, 0.4)', overflow: 'hidden', boxShadow: '0 40px 100px rgba(0,0,0,0.8)' }}>
                    <div ref={mapRef} style={{ width: '100%', height: '100%', opacity: 0.6 }} />
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                        <path d={getCurvePath()} fill="none" stroke="#D4AF37" strokeWidth="8" strokeLinecap="round" opacity="1" filter="drop-shadow(0 0 8px rgba(212,175,55,0.8))" />
                    </svg>
                    {currentItinerary.items.map((item, idx) => {
                        const { x, y } = mapCoord(item.spot.lat, item.spot.lng);
                        return (
                            <div key={idx} style={{ position: 'absolute', left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: 10 }}>
                                <div style={{ width: '15px', height: '15px', background: '#fff', borderRadius: '50%', border: '4px solid #D4AF37', boxShadow: '0 0 20px #D4AF37' }} />
                                <div style={{ position: 'absolute', left: '25px', top: '-5px', whiteSpace: 'nowrap', color: '#fff', fontWeight: 900, fontSize: '0.9rem', textShadow: '0 0 5px #000' }}>{item.spot.name}</div>
                            </div>
                        );
                    })}
                </div>

                {/* 2-2. Itinerary Box */}
                <div style={{ marginTop: '25px', padding: '50px', background: 'rgba(15, 20, 30, 0.85)', backdropFilter: 'blur(50px)', borderRadius: '45px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '30px', marginBottom: '40px' }}>
                        <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fff' }}>12:00 PM Checkout <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '1.2rem', fontWeight: 400 }}>(Andara Rese Van)</span></div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '35px' }}>
                        {currentItinerary.items.slice(1).map((item, idx) => {
                            const prevItem = currentItinerary.items[idx];
                            const travelTime = Math.round((item.arrival_time.getTime() - prevItem.departure_time.getTime()) / 60000);
                            return (
                                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                    <div style={{ color: 'rgba(255,255,255,0.6)', minWidth: '100px', fontWeight: 600, fontSize: '1.2rem' }}>
                                        <Clock size={16} style={{ color: '#D4AF37', marginRight: '10px' }} />
                                        {item.arrival_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(' AM', '').replace(' PM', '')} Pick:
                                    </div>
                                    <div style={{ flex: 1, fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{item.spot.name} <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '1rem', fontWeight: 400 }}>Visit Private Van</span></div>
                                    <div style={{ color: '#D4AF37', fontWeight: 900, fontSize: '1.1rem', background: 'rgba(212,175,55,0.08)', padding: '8px 20px', borderRadius: '12px' }}>{travelTime} mins</div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Flight Number & Confirm */}
                    <div style={{ marginTop: '50px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '40px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
                            <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 800, fontSize: '1.1rem' }}>Flight Number</span>
                            <input type="text" placeholder="KE638..." value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} style={{ background: 'transparent', border: 'none', borderBottom: '2px solid #D4AF37', color: '#fff', fontSize: '1.4rem', outline: 'none', flex: 1, fontWeight: 800, letterSpacing: '2px' }} />
                        </div>
                        <button onClick={() => setIsConfirmed(!isConfirmed)} style={{ width: '100%', padding: '20px', borderRadius: '20px', background: isConfirmed ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)', color: isConfirmed ? '#D4AF37' : '#000', border: isConfirmed ? '1px solid #D4AF37' : 'none', fontWeight: 950, fontSize: '1.3rem', cursor: 'pointer', transition: '0.3s' }}>
                            {isConfirmed ? '일정 수정하기' : '일정 확정 및 결과 확인'}
                        </button>
                    </div>
                    {isConfirmed && <div style={{ marginTop: '30px', padding: '30px', background: 'rgba(212,175,55,0.05)', borderRadius: '25px', border: '1px dashed #D4AF37', textAlign: 'center' }}><h3 style={{ margin: 0, color: '#D4AF37' }}>🎉 푸켓 고품격 일정이 생성되었습니다! (Total {currentItinerary.items.length - 1} Spots Selected)</h3></div>}
                </div>
            </div>

            {/* 3. Product Carousel (Infinite Loop + Arrows) */}
            <div style={{ marginTop: '120px', width: '100%', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{ display: 'inline-flex', gap: '15px', background: 'rgba(255,255,255,0.03)', padding: '10px', borderRadius: '100px' }}>
                        {CATEGORY_TABS.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '12px 30px', borderRadius: '100px', background: activeTab === tab.id ? '#D4AF37' : 'transparent', color: activeTab === tab.id ? '#000' : 'rgba(255,255,255,0.5)', border: 'none', fontWeight: 950, cursor: 'pointer' }}>{tab.label}</button>
                        ))}
                    </div>
                </div>

                <div style={{ maxWidth: '1250px', margin: '0 auto', position: 'relative' }}>
                    <button onClick={() => scrollSlider('left')} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(5,7,10,0.8)', border: '1px solid #D4AF37', color: '#D4AF37', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', zIndex: 100 }}><ChevronLeft size={30} /></button>
                    <button onClick={() => scrollSlider('right')} style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(5,7,10,0.8)', border: '1px solid #D4AF37', color: '#D4AF37', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', zIndex: 100 }}><ChevronRight size={30} /></button>

                    <div
                        ref={sliderRef}
                        className="hide-scrollbar"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                        style={{ display: 'flex', gap: '40px', overflowX: 'auto', scrollBehavior: 'smooth', padding: '20px 40px' }}
                    >
                        <div style={{ display: 'flex', gap: '40px', animation: !isPaused ? 'auto-scroll 60s linear infinite' : 'none' }}>
                            {[...Array(3)].map((_, i) => (
                                <React.Fragment key={i}>
                                    {RECOMMENDED_PLACES.filter(p => p.category === activeTab).map((place) => (
                                        <div key={place.id + i} onClick={() => addPlaceToItinerary(place)} style={{ width: '360px', borderRadius: '40px', overflow: 'hidden', position: 'relative', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                                            <img src={`https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80`} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)' }} />
                                            <div style={{ position: 'absolute', bottom: '30px', left: '30px', right: '30px' }}>
                                                <h4 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', fontWeight: 950, color: '#fff' }}>{place.name}</h4>
                                                <button style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #FFD700 0%, #D4AF37 100%)', color: '#000', border: 'none', borderRadius: '15px', fontWeight: 950 }}>BOOK NOW</button>
                                            </div>
                                        </div>
                                    ))}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </div>



            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                @keyframes auto-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
            `}</style>
        </div>
    );
};

export default DashboardScreen;
