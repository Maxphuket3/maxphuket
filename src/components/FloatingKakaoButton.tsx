import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingKakaoButton: React.FC = () => {
    return (
        <a
            href="http://pf.kakao.com/_rxbHRX"
            target="_blank"
            rel="noreferrer"
            style={{
                position: 'fixed',
                bottom: '24px',
                right: '24px',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#FEE500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                zIndex: 9999,
                cursor: 'pointer',
                transition: 'transform 0.2s',
                textDecoration: 'none',
                color: '#000'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
            <MessageCircle size={32} fill="#000" color="#000" />
        </a>
    );
};

export default FloatingKakaoButton;
