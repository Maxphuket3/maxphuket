import React from 'react';

const Contact = () => {
    return (
        <div style={{ padding: '6rem 2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '3rem',
                fontSize: '3rem',
                color: 'var(--color-primary)'
            }}>
                Real-time SNS Consultation
            </h1>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '3rem',
                backgroundColor: 'white',
                padding: '4rem',
                borderRadius: '24px',
                boxShadow: 'var(--shadow-md)',
                textAlign: 'center'
            }}>
                <div>
                    <h2 style={{ color: 'var(--color-text)', marginBottom: '1.5rem', fontSize: '2rem' }}>
                        We are here for you 24/7
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '3rem', lineHeight: '1.8' }}>
                        At MaxPhuket, all consultations, booking confirmations, and voucher deliveries are handled instantly via <strong>Real-time SNS</strong>.
                        <br />
                        No need to wait for emails. Chat with us like a friend!
                    </p>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap'
                    }}>
                        <a href="#" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: '#FAE100', // Kakao Yellow
                                color: '#3C1E1E',
                                padding: '1.5rem 3rem',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                fontSize: '1.4rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 12px rgba(250, 225, 0, 0.4)',
                                transition: 'transform 0.2s'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <span style={{ fontSize: '2rem' }}>💬</span>
                                KakaoTalk Inquiry
                            </div>
                        </a>

                        <a href="#" style={{ textDecoration: 'none' }}>
                            <div style={{
                                backgroundColor: '#06C755', // Line Green
                                color: 'white',
                                padding: '1.5rem 3rem',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                fontSize: '1.4rem',
                                fontWeight: 'bold',
                                boxShadow: '0 4px 12px rgba(6, 199, 85, 0.4)',
                                transition: 'transform 0.2s'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <span style={{ fontSize: '2rem' }}>📲</span>
                                Line Inquiry
                            </div>
                        </a>
                    </div>
                </div>

                <div style={{ borderTop: '2px dashed #eee', paddingTop: '3rem', marginTop: '1rem' }}>
                    <h3 style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>How it works</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                        {[
                            { step: '1', title: 'Chat Inquiry', desc: 'Ask anything anytime.' },
                            { step: '2', title: 'Instant Booking', desc: 'Confirm availability immediately.' },
                            { step: '3', title: 'SNS Voucher', desc: 'Receive e-voucher on your phone.' }
                        ].map((item, idx) => (
                            <div key={idx} style={{ maxWidth: '200px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'var(--color-primary-light)',
                                    color: 'white',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.5rem',
                                    fontWeight: 'bold',
                                    margin: '0 auto 1rem'
                                }}>
                                    {item.step}
                                </div>
                                <h4 style={{ margin: '0 0 0.5rem' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.9rem', color: '#888' }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
