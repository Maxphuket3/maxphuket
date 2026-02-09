import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tours, hotels, activities } from '../data/mockData';

const DetailPage = () => {
    const { type, id } = useParams();
    const [activeTab, setActiveTab] = useState('itinerary');

    let item = null;
    if (type === 'tours') item = tours.find(t => t.id === parseInt(id));
    else if (type === 'hotels') item = hotels.find(h => h.id === parseInt(id));
    else if (type === 'activities') item = activities.find(a => a.id === parseInt(id));

    if (!item) return <div style={{ padding: '5rem', textAlign: 'center' }}>Item not found</div>;

    // Use inclusions from item or default
    const inclusions = item.inclusions || ['Hotel Pickup', 'Eng Speaking Guide', 'Insurance', 'Lunch'];

    return (
        <div className="detail-page" style={{ paddingBottom: '4rem' }}>
            {/* Hero Image */}
            <div style={{ height: '500px', overflow: 'hidden', position: 'relative' }}>
                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                    position: 'absolute',
                    bottom: 0, 0: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                    padding: '3rem 2rem',
                    color: 'white'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <span style={{
                            backgroundColor: 'var(--color-secondary)', // Gold for tag
                            padding: '0.5rem 1rem',
                            borderRadius: '4px',
                            fontSize: '0.9rem',
                            fontWeight: 'bold',
                            marginBottom: '1rem',
                            display: 'inline-block',
                            color: '#333'
                        }}>
                            {type.toUpperCase()}
                        </span>
                        <h1 style={{ marginBottom: '0.5rem', fontSize: '3rem', fontFamily: 'var(--font-brand)' }}>{item.title}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            {item.operator && (
                                <span style={{
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.9rem'
                                }}>
                                    Operated by <strong>{item.operator}</strong>
                                </span>
                            )}
                            <span style={{ fontSize: '1.2rem', color: '#FFD700' }}>★ {item.rating} (120+ Reviews)</span>
                            <span style={{ color: 'rgba(255,255,255,0.8)' }}>|</span>
                            <span style={{ color: 'rgba(255,255,255,0.8)' }}>📍 {item.location || 'Phuket, Thailand'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                {/* Main Content */}
                <div style={{ gridColumn: 'span 2' }}>
                    {/* Tabs */}
                    <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: '2rem', overflowX: 'auto' }}>
                        {['itinerary', 'pricing', 'regulations'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '1rem 2rem',
                                    fontSize: '1.1rem',
                                    fontWeight: '600',
                                    color: activeTab === tab ? 'var(--color-primary)' : '#888',
                                    borderBottom: activeTab === tab ? '3px solid var(--color-primary)' : '3px solid transparent',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    textTransform: 'capitalize',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {activeTab === 'itinerary' && (
                        <div className="fade-in">
                            <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-brand)' }}>Experience Overview</h2>
                            <p style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#444' }}>
                                {item.description}
                                <br /><br />
                                Immerse yourself in the authentic Thai atmosphere. This curated experience is designed to provide you with the best of Phuket's culture and natural beauty.
                                Our local guides speak fluent Korean and English to ensure a smooth journey.
                            </p>

                            {/* Gallery Section */}
                            {item.gallery && item.gallery.length > 0 && (
                                <div style={{ marginTop: '3rem' }}>
                                    <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-brand)' }}>📸 Gallery</h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                                        gap: '1rem'
                                    }}>
                                        {item.gallery.map((img, idx) => (
                                            <div key={idx} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '8px', boxShadow: 'var(--shadow-sm)' }}>
                                                <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                                <h3 style={{ margin: '0 0 1rem', color: 'var(--color-text)' }}>🗺️ Location Map</h3>
                                <div style={{
                                    width: '100%',
                                    height: '350px',
                                    backgroundColor: '#e0e0e0',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: '8px',
                                    position: 'relative'
                                }}>
                                    <div style={{
                                        backgroundColor: 'white',
                                        padding: '1rem',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                                        textAlign: 'center'
                                    }}>
                                        <span style={{ fontSize: '2rem', display: 'block' }}>📍</span>
                                        <strong>{item.location || 'Phuket'}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'pricing' && (
                        <div className="fade-in">
                            <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-brand)' }}>Pricing Details</h2>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
                                <thead>
                                    <tr style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
                                        <th style={{ padding: '1rem', textAlign: 'left' }}>Package Type</th>
                                        <th style={{ padding: '1rem', textAlign: 'center' }}>Adult</th>
                                        <th style={{ padding: '1rem', textAlign: 'center' }}>Child (4-11)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Standard Package', adult: item.price, child: '70%' },
                                        { name: 'Premium (Private Transfer)', adult: 'Check Inquiry', child: 'Check Inquiry' }
                                    ].map((row, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>{row.name}</td>
                                            <td style={{ padding: '1rem', textAlign: 'center' }}>{row.adult}</td>
                                            <td style={{ padding: '1rem', textAlign: 'center' }}>{row.child}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p style={{ fontSize: '0.9rem', color: '#666' }}>* Prices are in THB (Thai Baht) and include all taxes and service charges.</p>
                        </div>
                    )}

                    {activeTab === 'regulations' && (
                        <div className="fade-in">
                            <h2 style={{ color: 'var(--color-secondary)', marginBottom: '1.5rem', fontFamily: 'var(--font-brand)' }}>Essential Information</h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {[
                                    { title: 'Cancellation Policy', text: 'Free cancellation up to 24 hours before the experience starts (local time).', icon: '📅' },
                                    { title: 'What to Bring', text: 'Sunscreen, sunglasses, swimwear, towel, and camera.', icon: '🎒' },
                                    { title: 'Meeting Point', text: 'Hotel lobby or designated pier (details in confirmation voucher).', icon: '📍' },
                                    { title: 'Insurance', text: 'Accident insurance is provided for all registered guests.', icon: '🛡️' }
                                ].map((rule, idx) => (
                                    <li key={idx} style={{
                                        marginBottom: '1.5rem',
                                        display: 'flex',
                                        gap: '1rem',
                                        alignItems: 'start'
                                    }}>
                                        <span style={{ fontSize: '1.5rem', backgroundColor: '#f0f0f0', padding: '0.5rem', borderRadius: '50%' }}>{rule.icon}</span>
                                        <div>
                                            <h4 style={{ margin: '0 0 0.3rem', color: 'var(--color-accent)' }}>{rule.title}</h4>
                                            <p style={{ margin: 0, color: '#555' }}>{rule.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div>
                    <div style={{
                        position: 'sticky',
                        top: '100px',
                        padding: '2rem',
                        borderRadius: '12px',
                        boxShadow: 'var(--shadow-md)',
                        border: '1px solid #eee',
                        backgroundColor: 'white'
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <span style={{ display: 'block', color: '#666', fontSize: '0.9rem' }}>Starting From</span>
                            <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--color-accent)', fontFamily: 'var(--font-brand)' }}>
                                {item.minPrice ? item.minPrice.toLocaleString() + ' THB' : item.price}
                            </span>
                            <span style={{ display: 'block', color: '#888', fontSize: '0.8rem' }}>per person</span>
                        </div>

                        <button style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: 'var(--color-primary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1.1rem',
                            cursor: 'pointer',
                            marginBottom: '1rem',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 6px rgba(0,136,204,0.3)',
                            fontFamily: 'var(--font-brand)'
                        }}>
                            Book Now
                        </button>
                        <button style={{
                            width: '100%',
                            padding: '1rem',
                            backgroundColor: '#FAE100', // Kakao Yellow
                            color: '#3C1E1E',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            fontFamily: 'var(--font-brand)'
                        }}>
                            <span>💬</span> Inquire on KakaoTalk
                        </button>

                        <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                            <h4 style={{ margin: '0 0 1rem', fontFamily: 'var(--font-brand)' }}>Trip Highlights</h4>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {inclusions.map(tag => (
                                    <span key={tag} style={{
                                        fontSize: '0.8rem',
                                        padding: '4px 8px',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '4px',
                                        color: '#666'
                                    }}>
                                        ✓ {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPage;
