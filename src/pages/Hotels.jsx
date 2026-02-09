import React from 'react';
import { Link } from 'react-router-dom';
import { hotels } from '../data/mockData';

const Hotels = () => {
    return (
        <div style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', color: 'var(--color-primary)', marginBottom: '3rem' }}>Hotels & Spas</h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2rem'
            }}>
                {hotels.map(item => (
                    <Link key={item.id} to={`/detail/hotels/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-md)',
                            cursor: 'pointer',
                            height: '100%',
                            transition: 'transform 0.2s'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                            />
                            <div style={{ padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0 }}>{item.title}</h3>
                                    <span style={{ color: '#FFAA00' }}>★ {item.rating}</span>
                                </div>
                                <p style={{ color: '#555', fontSize: '0.95rem' }}>Location: {item.location}</p>
                                <div style={{ marginTop: '1rem', fontWeight: 'bold', color: 'var(--color-accent)' }}>
                                    {item.price} / Night
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Hotels;
