import React from 'react';
import { Link } from 'react-router-dom';
import { tours, activities } from '../data/mockData';
import muralImg from '../assets/mural.jpg';

const SectionTitle = ({ title, subtitle }) => (
    <div className="center-container" style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
        <div style={{
            width: '80px',
            height: '4px',
            backgroundColor: 'var(--color-secondary)',
            marginBottom: '1.5rem',
            borderRadius: '2px'
        }}></div>
        <p style={{ maxWidth: '600px', margin: '0 auto', color: '#666' }}>{subtitle}</p>
    </div>
);

const Card = ({ item, type }) => (
    <Link to={`/detail/${type}/${item.id}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: '400px' }}>
        <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
        >
            <div style={{ height: '250px', overflow: 'hidden', position: 'relative' }}>
                <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'white',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                    ★ {item.rating}
                </div>
            </div>
            <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--color-text)' }}>{item.title}</h3>
                <p style={{ fontSize: '1rem', color: '#666', marginBottom: '1.5rem', flex: 1 }}>
                    {item.description || item.location}
                </p>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                    <span style={{ fontWeight: '700', color: 'var(--color-accent)', fontSize: '1.3rem' }}>
                        {item.price}
                    </span>
                    <span style={{
                        padding: '0.6rem 1.2rem',
                        border: '1px solid var(--color-primary)',
                        backgroundColor: 'transparent',
                        color: 'var(--color-primary)',
                        borderRadius: '30px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                    }}>
                        상세보기
                    </span>
                </div>
            </div>
        </div>
    </Link>
);

const Home = () => {
    return (
        <div className="page-home">
            {/* Hero Section - Mural Style */}
            <section className="hero center-container" style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.3)), url(${muralImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '85vh',
                minHeight: '600px',
                color: 'white',
                padding: '0 1rem',
                position: 'relative'
            }}>
                {/* Overlay for better text readability if needed */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,136,204,0.2))',
                    zIndex: 0
                }}></div>

                <div className="center-container" style={{ maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        border: '4px solid rgba(255,255,255,0.8)',
                        padding: '3rem',
                        backdropFilter: 'blur(8px)',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                        borderRadius: '4px' // Slight edge rounding
                    }}>
                        <h1 style={{
                            marginBottom: '1rem',
                            fontSize: '5.5rem', // Larger for impact
                            letterSpacing: '0.05em', // More spacing for Jua
                            fontFamily: 'var(--font-brand)', // Use Jua
                            background: 'var(--gradient-text-pop)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(4px 4px 0px rgba(255,255,255,0.9))', // White hard shadow for "sticker" effect
                            lineHeight: 1.1
                        }}>
                            COLORFUL PHUKET
                        </h1>
                        <p style={{
                            color: 'white',
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginBottom: '2.5rem',
                            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            wordBreak: 'keep-all'
                        }}>
                            푸켓의 예술, 문화, 그리고 바다를 만나보세요
                        </p>
                        <Link to="/tours" style={{
                            padding: '1.2rem 4rem',
                            backgroundColor: 'white',
                            color: 'var(--color-mural-red)',
                            fontSize: '1.2rem',
                            fontWeight: '900',
                            boxShadow: '8px 8px 0px var(--color-mural-yellow)', /* Artistic Pop Shadow */
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            border: '2px solid white',
                            display: 'inline-block'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translate(-4px, -4px)';
                                e.currentTarget.style.boxShadow = '12px 12px 0px var(--color-mural-yellow)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translate(0, 0)';
                                e.currentTarget.style.boxShadow = '8px 8px 0px var(--color-mural-yellow)';
                            }}
                        >
                            여행 시작하기
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Tours */}
            <section style={{ padding: '8rem 0', backgroundColor: '#fff' }}>
                <div className="max-width-1200">
                    <SectionTitle title="추천 투어" subtitle="완벽한 휴가를 위해 엄선된 최고의 경험들" />
                    <div className="grid-auto-fit">
                        {tours.map(tour => (
                            <Card key={tour.id} item={tour} type="tours" />
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Enhanced Symmetry */}
            <section style={{ padding: '8rem 0', backgroundColor: 'var(--color-bg)' }}>
                <div className="max-width-1200 center-container">
                    <h2 style={{ marginBottom: '4rem' }}>Why Trust <span style={{ color: 'var(--color-secondary)' }}>MaxPhuket</span>?</h2>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '2rem',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                        {[
                            { icon: '🇹🇭', title: '현지 법인 운영', text: '태국 정식 등록 법인으로 100% 신뢰할 수 있습니다.' },
                            { icon: '💎', title: '프리미엄 서비스', text: '한국인 여행객을 위한 최상의 투어만을 선별합니다.' },
                            { icon: '💬', title: '24시간 케어', text: '카카오톡을 통한 실시간 한국어 상담을 지원합니다.' }
                        ].map((feature, idx) => (
                            <div key={idx} style={{
                                flex: '1 1 300px',
                                maxWidth: '350px',
                                padding: '3rem 2rem',
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                boxShadow: 'var(--shadow-art)', /* Using Artistic Shadow here too */
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                border: '1px solid rgba(0,0,0,0.05)',
                                transition: 'transform 0.3s'
                            }}
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.1))' }}>{feature.icon}</div>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-mural-text)' }}>{feature.title}</h3>
                                <p style={{ fontSize: '1rem', color: '#666', margin: 0, wordBreak: 'keep-all' }}>{feature.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Activities Teaser */}
            <section style={{ padding: '8rem 0', backgroundColor: 'white' }}>
                <div className="max-width-1200">
                    <SectionTitle title="인기 액티비티" subtitle="쇼, 워터파크, 그리고 럭셔리 스파" />
                    <div className="grid-auto-fit">
                        {activities.slice(0, 3).map(act => (
                            <Card key={act.id} item={act} type="activities" />
                        ))}
                    </div>
                    <div className="center-container" style={{ marginTop: '4rem' }}>
                        <Link to="/activities" style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            color: 'var(--color-mural-teal)', /* Using Teal accent */
                            borderBottom: '2px solid var(--color-mural-teal)',
                            paddingBottom: '4px'
                        }}>
                            액티비티 전체보기 →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
