import React from 'react';
import { events } from '../data/eventData';

const Calendar = () => {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-art)', // Using the stronger art shadow
            padding: '2.5rem',
            maxWidth: '1000px', // Wider to breathe
            margin: '0 auto',
            border: '2px solid rgba(255,85,0,0.1)' // Subtle orange border
        }}>
            <h2 style={{
                background: 'var(--gradient-text-pop)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '0.5rem',
                marginBottom: '2rem',
                textAlign: 'center',
                fontFamily: 'var(--font-brand)',
                fontSize: '2.5rem'
            }}>
                THAI FESTIVALS & EVENTS 🎉
            </h2>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {events.map((event, index) => (
                    <div key={event.id} style={{
                        display: 'flex',
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        borderLeft: `6px solid ${
                            // Alternating colorful borders
                            index % 3 === 0 ? 'var(--color-mural-red)' :
                                index % 3 === 1 ? 'var(--color-mural-teal)' :
                                    'var(--color-mural-yellow)'
                            }`
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.01)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                        }}
                    >
                        {/* Date Box */}
                        <div style={{
                            background: index % 3 === 0 ? 'var(--color-mural-red)' :
                                index % 3 === 1 ? 'var(--color-mural-teal)' :
                                    'var(--color-mural-yellow)',
                            color: index % 3 === 2 ? '#333' : 'white', // Dark text for yellow
                            padding: '1.2rem',
                            minWidth: '110px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            fontWeight: 'bold'
                        }}>
                            <div style={{ fontSize: '0.9rem', opacity: 0.9, textTransform: 'uppercase' }}>Date</div>
                            <div style={{ fontSize: '1.2rem' }}>{event.date}</div>
                        </div>

                        {/* Content Box */}
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                <h3 style={{ margin: 0, fontSize: '1.3rem', fontFamily: 'var(--font-heading)' }}>{event.title}</h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    background: 'linear-gradient(45deg, #f3f4f6, #fff)',
                                    padding: '4px 10px',
                                    borderRadius: '20px',
                                    color: '#555',
                                    border: '1px solid #eee',
                                    fontWeight: '500'
                                }}>
                                    {event.type}
                                </span>
                            </div>
                            <p style={{ margin: 0, color: '#666', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                <span style={{ fontSize: '1.1rem' }}>📍</span>
                                <span style={{ fontWeight: '500', color: '#444' }}>{event.location}</span>
                                <span style={{ color: '#ccc' }}>|</span>
                                <span>{event.description}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;
