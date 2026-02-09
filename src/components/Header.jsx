import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Bodhi Leaf SVG Component (Realistic Gold)
const BodhiLeafIcon = () => (
    <svg viewBox="0 0 100 120" style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.25em', marginLeft: '0.3rem', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}>
        <defs>
            <linearGradient id="gradient-gold-leaf" x1="0%" y1="0%" x2="100%" y2="100%">
                {/* Metallic Gold Effect */}
                <stop offset="0%" stopColor="#BF953F" />
                <stop offset="25%" stopColor="#FCF6BA" />
                <stop offset="50%" stopColor="#B38728" />
                <stop offset="75%" stopColor="#FBF5B7" />
                <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>
        </defs>
        <g fill="url(#gradient-gold-leaf)">
            {/* Main Leaf Shape - More organic curve */}
            <path d="M50 0 C50 0 90 35 95 60 C100 85 75 110 50 120 C25 110 0 85 5 60 C10 35 50 0 50 0 Z" />
            {/* Central Vein (White-ish overlay for detail) */}
            <path d="M50 10 Q 50 60 50 110" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
            {/* Side Veins */}
            <path d="M50 40 Q 70 30 80 25 M50 60 Q 75 50 85 45 M50 80 Q 70 75 80 70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            <path d="M50 40 Q 30 30 20 25 M50 60 Q 25 50 15 45 M50 80 Q 30 75 20 70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        </g>
    </svg>
);

const Header = () => {
    const location = useLocation();

    const navItems = [
        { name: '홈', path: '/' },
        { name: '액티비티', path: '/activities' },
        { name: '호텔', path: '/hotels' },
        { name: '투어', path: '/tours' },
        { name: '핫플', path: '/hotspots' },
        { name: '플래너', path: '/planner' },
        { name: '이벤트', path: '/events' },
        { name: '실시간 톡', path: '/livetalk' },
        { name: '문의하기', path: '/contact' },
    ];

    return (
        <header style={{
            backgroundColor: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(12px)',
            boxShadow: 'var(--shadow-sm)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '1200px',
                padding: '0 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Logo - Perfectly Vertically Aligned */}
                <div style={{
                    fontSize: '2rem',
                    fontWeight: '500', // Jua/Black Han Sans is bold
                    fontFamily: 'var(--font-brand)',
                    letterSpacing: '0.02em',
                    lineHeight: 1
                }}>
                    <Link to="/" style={{
                        background: 'var(--gradient-text-pop)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))' // Subtle drop shadow for depth
                    }}>
                        MAXPHUKET <BodhiLeafIcon />
                    </Link>
                </div>

                {/* Navigation - Centered Items */}
                <nav>
                    <ul style={{
                        display: 'flex',
                        gap: '2.5rem',
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        alignItems: 'center',
                        height: '100%'
                    }}>
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        style={{
                                            fontWeight: isActive ? '700' : '500',
                                            color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                                            fontSize: '0.95rem',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            position: 'relative',
                                            padding: '0.5rem 0'
                                        }}
                                        onMouseOver={(e) => e.target.style.color = 'var(--color-primary)'}
                                        onMouseOut={(e) => e.target.style.color = isActive ? 'var(--color-primary)' : 'var(--color-text)'}
                                    >
                                        {item.name}
                                        {/* Active Indicator Dot */}
                                        {isActive && (
                                            <span style={{
                                                position: 'absolute',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                width: '4px',
                                                height: '4px',
                                                backgroundColor: 'var(--color-secondary)',
                                                borderRadius: '50%'
                                            }} />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
