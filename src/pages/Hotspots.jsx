import React, { useState } from 'react';
import { hotspots, categories } from '../data/hotspotsData';

const Hotspots = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredItems = selectedCategory === 'all'
        ? hotspots
        : hotspots.filter(item => item.category === selectedCategory);

    return (
        <div className="page-hotspots" style={{ backgroundColor: '#f9f9f9', minHeight: '100vh', paddingBottom: '4rem' }}>
            {/* Hero Header */}
            <div style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '4rem 2rem 6rem',
                textAlign: 'center',
                marginBottom: '-3rem'
            }}>
                <h1 style={{ fontFamily: 'var(--font-brand)', fontSize: '3rem', marginBottom: '1rem' }}>
                    PHUKET HOTSPOTS
                </h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
                    현지인이 추천하는 푸켓의 숨은 명소와 핫플레이스
                </p>
            </div>

            <div className="max-width-1200" style={{ padding: '0 1rem' }}>
                {/* Category Filter */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    flexWrap: 'wrap',
                    marginBottom: '3rem'
                }}>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '0.8rem 1.5rem',
                                border: 'none',
                                borderRadius: '30px',
                                backgroundColor: selectedCategory === cat.id ? 'var(--color-secondary)' : 'white',
                                color: selectedCategory === cat.id ? '#333' : '#666',
                                fontWeight: 'bold',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            <span>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Content Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {filteredItems.map(item => (
                        <div key={item.id} style={{
                            backgroundColor: 'white',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'transform 0.3s'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    backgroundColor: 'white',
                                    padding: '0.3rem 0.8rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    fontWeight: 'bold',
                                    color: 'var(--color-primary)'
                                }}>
                                    {categories.find(c => c.id === item.category)?.name}
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ marginBottom: '0.5rem', fontFamily: 'var(--font-brand)', fontSize: '1.4rem' }}>{item.title}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#666', fontSize: '0.9rem' }}>
                                    <span>📍 {item.location}</span>
                                    <span>⭐ {item.rating}</span>
                                </div>
                                <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                                    {item.description}
                                </p>

                                {item.tips && (
                                    <div style={{ backgroundColor: '#fff8e1', padding: '0.8rem', borderRadius: '8px', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                        💡 <strong>Tip:</strong> {item.tips}
                                    </div>
                                )}

                                <a
                                    href={item.googleMapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '0.5rem',
                                        padding: '0.8rem',
                                        backgroundColor: '#4285F4', // Google Blue
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: 'bold',
                                        borderRadius: '8px',
                                        transition: 'background 0.3s'
                                    }}
                                >
                                    <span>🗺️</span> 구글 지도에서 보기
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hotspots;
