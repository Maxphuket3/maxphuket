import React, { useState, useEffect } from 'react';
import { weatherData } from '../data/eventData';

const WeatherWidget = () => {
    const [currentRegion, setCurrentRegion] = useState('Phuket');
    const data = weatherData[currentRegion];

    // Auto-rotate regions every 5 seconds
    useEffect(() => {
        const regions = Object.keys(weatherData);
        const interval = setInterval(() => {
            setCurrentRegion(prev => {
                const idx = regions.indexOf(prev);
                return regions[(idx + 1) % regions.length];
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            width: '200px',
            borderLeft: '5px solid var(--color-accent)',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.3rem' }}>
                Current Weather in
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h4 style={{ margin: 0, color: 'var(--color-secondary)' }}>{currentRegion}</h4>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>
                        {data.temp}°C
                    </div>
                </div>
                <div style={{ fontSize: '2.5rem' }}>{data.icon}</div>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                {data.condition} • Hum: {data.humidity}%
            </div>
        </div>
    );
};

export default WeatherWidget;
