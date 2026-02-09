import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../context/JourneyContext';
import { RECOMMENDED_PLACES, CATEGORY_TABS, RecommendedPlace } from '../data/recommendedPlaces';
import { MapPin, Plus, Check } from 'lucide-react';

const JourneySelectScreen: React.FC = () => {
    const navigate = useNavigate();
    const { selectedPlaces, addPlace, removePlace } = useJourney(); // Get removePlace

    const [activeCategory, setActiveCategory] = useState('VIEW');


    const filteredPlaces = RECOMMENDED_PLACES.filter(p => p.category === activeCategory);
    const sortedSelected = [...selectedPlaces].sort((a, b) => a.lat - b.lat);





    // Toggle Selection Logic
    const handlePlaceToggle = (place: RecommendedPlace) => {
        const isSelected = selectedPlaces.find(p => p.id === place.id);
        if (isSelected) {
            removePlace(place.id);
        } else {
            addPlace(place);
        }
    };

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: '#1a202c',
            color: '#fff',
            overflow: 'hidden',
            position: 'relative' // relative for absolute children if needed
        }}>
            {/* Map Area */}
            <div style={{ height: '40vh', width: '100%', position: 'relative' }}>
                <MapContainer
                    center={[7.9519, 98.3381]}
                    zoom={10}
                    style={{ width: '100%', height: '100%', background: '#2d3748' }}
                    zoomControl={false}
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; CARTO'
                    />
                    {sortedSelected.map((place, index) => (
                        <Marker
                            key={place.id}
                            position={[place.lat, place.lng]}
                            icon={L.divIcon({
                                className: 'custom-icon',
                                html: `<div style="background-color: #D4AF37; width: 24px; height: 24px; border-radius: 50%; border: 2px solid #fff; display: flex; align-items: center; justify-content: center; color: #000; font-weight: bold; font-size: 10px;">${index + 1}</div>`,
                                iconSize: [24, 24],
                                iconAnchor: [12, 12]
                            })}
                        >
                            <Popup>{place.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>

                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        zIndex: 20,
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
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                </button>

                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '20px',
                    background: 'rgba(0,0,0,0.6)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backdropFilter: 'blur(4px)',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                }}>
                    <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>{selectedPlaces.length}</span> Places Selected
                </div>
            </div>

            {/* Content Area */}
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                background: '#2d3748',
                borderTopLeftRadius: '24px',
                borderTopRightRadius: '24px',
                marginTop: '-24px',
                position: 'relative',
                zIndex: 10,
                boxShadow: '0 -10px 30px rgba(0,0,0,0.3)',
                overflow: 'hidden'
            }}>
                {/* Category Tabs Slider */}
                <div style={{ position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    {/* Left Arrow */}
                    <button
                        onClick={() => {
                            const container = document.getElementById('category-scroll-container');
                            if (container) container.scrollBy({ left: -150, behavior: 'smooth' });
                        }}
                        style={{
                            position: 'absolute',
                            left: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 20,
                            background: 'rgba(0,0,0,0.6)',
                            border: '1px solid rgba(212, 175, 55, 0.5)',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#D4AF37',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                    </button>

                    {/* Scrollable Container */}
                    <div
                        id="category-scroll-container"
                        className="hide-scrollbar"
                        style={{
                            padding: '20px 40px', // Padding for arrows
                            overflowX: 'auto',
                            whiteSpace: 'nowrap',
                            display: 'flex',
                            gap: '12px',
                            scrollBehavior: 'smooth'
                        }}
                    >
                        {CATEGORY_TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveCategory(tab.id)}
                                style={{
                                    flex: '0 0 auto',
                                    padding: '8px 16px',
                                    borderRadius: '100px',
                                    border: '1px solid',
                                    borderColor: activeCategory === tab.id ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                                    background: activeCategory === tab.id ? '#D4AF37' : 'transparent',
                                    color: activeCategory === tab.id ? '#000' : '#fff',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px'
                                }}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={() => {
                            const container = document.getElementById('category-scroll-container');
                            if (container) container.scrollBy({ left: 150, behavior: 'smooth' });
                        }}
                        style={{
                            position: 'absolute',
                            right: '5px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 20,
                            background: 'rgba(0,0,0,0.6)',
                            border: '1px solid rgba(212, 175, 55, 0.5)',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#D4AF37',
                            backdropFilter: 'blur(4px)'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                    </button>
                </div>

                {/* Places List */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
                        {filteredPlaces.map(place => {
                            const isSelected = selectedPlaces.find(p => p.id === place.id);
                            return (
                                <div
                                    key={place.id}
                                    onClick={() => handlePlaceToggle(place)}
                                    style={{
                                        background: isSelected ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(212, 175, 55, 0.05))' : 'rgba(255,255,255,0.05)',
                                        borderRadius: '16px',
                                        padding: '15px',
                                        border: '1px solid',
                                        borderColor: isSelected ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        position: 'relative',
                                        boxShadow: isSelected ? '0 4px 12px rgba(212, 175, 55, 0.2)' : 'none'
                                    }}
                                >
                                    <div style={{ marginBottom: '10px', fontSize: '1.5rem' }}>
                                        {CATEGORY_TABS.find(c => c.id === place.category)?.icon}
                                    </div>
                                    <h4 style={{ margin: '0 0 5px 0', fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                                        {place.name}
                                    </h4>

                                    {/* Google Map Link Button */}
                                    <a
                                        href={place.googleMapsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()} // Prevent card toggle
                                        style={{
                                            display: 'inline-block',
                                            marginTop: '4px',
                                            fontSize: '0.75rem',
                                            color: '#D4AF37',
                                            textDecoration: 'none',
                                            border: '1px solid rgba(212, 175, 55, 0.4)',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                                            e.currentTarget.style.borderColor = '#D4AF37';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = 'transparent';
                                            e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                                        }}
                                    >
                                        Google Map 🗺️
                                    </a>
                                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                        {isSelected ? (
                                            <div style={{
                                                width: '24px', height: '24px', borderRadius: '50%', background: '#D4AF37',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.3)'
                                            }}>
                                                <Check size={14} color="#000" strokeWidth={3} />
                                            </div>
                                        ) : (
                                            <div style={{
                                                width: '24px', height: '24px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <Plus size={14} color="rgba(255,255,255,0.5)" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Button - Only shows when at least 1 place selected? Or always? User said "Final Schedule Check" */}
                <div style={{
                    padding: '20px',
                    background: 'rgba(26, 32, 44, 0.9)',
                    backdropFilter: 'blur(10px)',
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <button
                        onClick={() => navigate('/result')}
                        disabled={selectedPlaces.length === 0}
                        style={{
                            width: '100%',
                            padding: '18px',
                            background: selectedPlaces.length > 0 ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '16px',
                            color: selectedPlaces.length > 0 ? '#000' : 'rgba(255,255,255,0.3)',
                            fontSize: '1.1rem',
                            fontWeight: 800,
                            cursor: selectedPlaces.length > 0 ? 'pointer' : 'not-allowed',
                            boxShadow: selectedPlaces.length > 0 ? '0 4px 20px rgba(212, 175, 55, 0.4)' : 'none',
                            transition: 'all 0.3s'
                        }}
                    >
                        최종 일정 확인하기 ({selectedPlaces.length})
                    </button>
                </div>
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default JourneySelectScreen;
