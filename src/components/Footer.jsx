import React from 'react';

// Reusable Bodhi Icon (Realistic Gold)
const BodhiLeafIcon = () => (
    <svg viewBox="0 0 100 120" style={{ width: '1.2em', height: '1.2em', verticalAlign: '-0.25em', marginLeft: '0.3rem', filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}>
        <defs>
            <linearGradient id="gradient-gold-leaf-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                {/* Metallic Gold Effect */}
                <stop offset="0%" stopColor="#BF953F" />
                <stop offset="25%" stopColor="#FCF6BA" />
                <stop offset="50%" stopColor="#B38728" />
                <stop offset="75%" stopColor="#FBF5B7" />
                <stop offset="100%" stopColor="#AA771C" />
            </linearGradient>
        </defs>
        <g fill="url(#gradient-gold-leaf-footer)">
            {/* Main Leaf Shape - More organic curve */}
            <path d="M50 0 C50 0 90 35 95 60 C100 85 75 110 50 120 C25 110 0 85 5 60 C10 35 50 0 50 0 Z" />
            {/* Central Vein */}
            <path d="M50 10 Q 50 60 50 110" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" />
            {/* Side Veins */}
            <path d="M50 40 Q 70 30 80 25 M50 60 Q 75 50 85 45 M50 80 Q 70 75 80 70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
            <path d="M50 40 Q 30 30 20 25 M50 60 Q 25 50 15 45 M50 80 Q 30 75 20 70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
        </g>
    </svg>
);

const Footer = () => {
    return (
        <footer style={{
            backgroundColor: '#00264d', // Darker navy for footer
            color: 'white',
            padding: '4rem 2rem',
            marginTop: 'auto'
        }}>
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Wider columns for Korean
                gap: '3rem', // Gap between columns
                textAlign: 'center' // Align with global centering theme
            }}>
                <div>
                    <h3 style={{
                        background: 'var(--gradient-text-pop)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontSize: '2.5rem',
                        marginBottom: '1.2rem',
                        fontFamily: 'var(--font-brand)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        MAXPHUKET <BodhiLeafIcon />
                    </h3>
                    <p style={{ opacity: 0.8, wordBreak: 'keep-all', color: '#ccc' }}>
                        한국인 자유여행객을 위한 푸켓 전문 여행사.<br />
                        진정한 경험과 신뢰할 수 있는 서비스를 제공합니다.
                    </p>
                </div>

                <div>
                    <h4 style={{ color: 'var(--color-white)', fontSize: '1.2rem', marginBottom: '1.2rem' }}>고객 센터</h4>
                    <ul style={{ lineHeight: '2', opacity: 0.9 }}>
                        <li>📞 +66 00-000-0000</li>
                        <li>💬 카카오톡: maxphuket</li>
                        <li>📧 contact@maxphuket.com</li>
                    </ul>
                </div>

                <div>
                    <h4 style={{ color: 'var(--color-white)', fontSize: '1.2rem', marginBottom: '1.2rem' }}>사업자 정보</h4>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.6, color: '#aaa' }}>
                        <strong>Max Phuket Co., Ltd.</strong><br />
                        태국 법인 등록 번호: 12/34567<br />
                        주소: 123 Patong Beach Road, Phuket, 83150<br />
                    </p>
                </div>
            </div>

            <div style={{
                textAlign: 'center',
                marginTop: '4rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                fontSize: '0.8rem',
                opacity: 0.6
            }}>
                © {new Date().getFullYear()} Max Phuket Co., Ltd. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
