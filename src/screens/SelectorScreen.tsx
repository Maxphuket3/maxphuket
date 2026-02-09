import React, { useState } from 'react';
import { MOCK_SPOTS, MOCK_PARTNERS } from '../data/mockData';
import { Spot } from '../types';

const SelectorScreen: React.FC<{ onComplete: (ids: string[]) => void }> = ({ onComplete }) => {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const allSpots: Spot[] = [...MOCK_SPOTS, ...MOCK_PARTNERS];

    const toggleSelect = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <div className="selector-container" style={{ padding: '40px', background: '#0a0a0a', minHeight: '100vh' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: '#D4AF37' }}>Pick Your Hotspots</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '40px' }}>AI will optimize your path northbound to the airport.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                {allSpots.map(spot => (
                    <div
                        key={spot.id}
                        className="glass-card"
                        style={{
                            padding: '24px',
                            cursor: 'pointer',
                            border: selectedIds.includes(spot.id) ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                            transition: 'all 0.3s ease'
                        }}
                        onClick={() => toggleSelect(spot.id)}
                    >
                        <div style={{ position: 'relative', height: '180px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
                            <img src={spot.images[0]} alt={spot.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {'commission_rate' in spot && (
                                <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#D4AF37', color: '#000', padding: '4px 12px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: 800 }}>
                                    Luxury Pick
                                </span>
                            )}
                        </div>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{spot.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>{spot.area} • {spot.category}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '1rem', fontWeight: 600 }}>{spot.price.toLocaleString()} THB</span>
                            <button
                                className="btn-primary"
                                style={{ padding: '8px 16px', fontSize: '0.7rem' }}
                                onClick={(e) => { e.stopPropagation(); toggleSelect(spot.id); }}
                            >
                                {selectedIds.includes(spot.id) ? 'Selected' : 'Add to Trip'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedIds.length > 0 && (
                <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', width: '90%', maxWidth: '600px' }}>
                    <button className="btn-primary" onClick={() => onComplete(selectedIds)} style={{ width: '100%', fontSize: '1.1rem' }}>
                        Generate AI Optimized Itinerary ({selectedIds.length} spots)
                    </button>
                </div>
            )}
        </div>
    );
};

export default SelectorScreen;
