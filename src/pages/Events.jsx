import React from 'react';
import Calendar from '../components/Calendar';
import WeatherWidget from '../components/WeatherWidget';

const Events = () => {
    return (
        <div style={{ padding: '5rem 2rem', minHeight: '80vh', position: 'relative' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ color: 'var(--color-secondary)', fontSize: '3rem', marginBottom: '0.5rem' }}>
                    What's On in Thailand
                </h1>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>
                    Stay updated with local festivals, events, and real-time weather.
                </p>
            </div>

            <Calendar />

            {/* Weather Widget will be fixed to bottom right, but included here for logic */}
            <WeatherWidget />

            <div style={{
                maxWidth: '800px',
                margin: '4rem auto',
                padding: '2rem',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid var(--color-primary)',
                textAlign: 'center'
            }}>
                <h3 style={{ color: 'var(--color-primary)' }}>🔔 Get Event Notifications</h3>
                <p>Subscribe to our newsletter to get weekly updates on Phuket events!</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '1rem' }}>
                    <input type="email" placeholder="Your Email Address" style={{ padding: '0.8rem', width: '60%', borderRadius: '4px', border: '1px solid #ddd' }} />
                    <button style={{
                        padding: '0.8rem 2rem',
                        backgroundColor: 'var(--color-secondary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}>Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Events;
