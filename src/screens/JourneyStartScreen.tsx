import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../context/JourneyContext';
import { Plane, Users, MapPin, Hotel as HotelIcon, Star } from 'lucide-react';
import ProductCarousel from '../components/ProductCarousel';
import { Product } from '../data/products';
import { PHUKET_HOTELS, Hotel } from '../data/hotels';

const JourneyStartScreen: React.FC = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useJourney();
    const [localInfo, setLocalInfo] = useState(userInfo);

    // Hotel Autocomplete State
    const [hotelQuery, setHotelQuery] = useState(userInfo.resort || '');
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [showHotelDropdown, setShowHotelDropdown] = useState(false);
    const hotelInputRef = useRef<HTMLInputElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (hotelInputRef.current && !hotelInputRef.current.contains(event.target as Node)) {
                setShowHotelDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleHotelSearch = (query: string) => {
        setHotelQuery(query);
        handleChange('resort', query); // Keep binding for free typing

        if (query.trim() === '') {
            setFilteredHotels(PHUKET_HOTELS);
        } else {
            const lower = query.toLowerCase();
            const filtered = PHUKET_HOTELS.filter(h =>
                h.nameKo.includes(query) ||
                h.nameEn.toLowerCase().includes(lower)
            );
            setFilteredHotels(filtered);
        }
        setShowHotelDropdown(true);
    };

    const selectHotel = (hotel: Hotel) => {
        const fullName = `${hotel.nameKo} (${hotel.nameEn})`;
        setHotelQuery(fullName);
        handleChange('resort', fullName);
        setShowHotelDropdown(false);
    };

    const handleChange = (field: keyof typeof userInfo, value: any) => {
        setLocalInfo(prev => {
            const newState = { ...prev, [field]: value };

            // Auto Vehicle Recommendation Logic
            if (field === 'personCount') {
                const count = value as number;
                if (count >= 4) {
                    newState.vehicleType = 'VAN';
                } else {
                    newState.vehicleType = 'SEDAN';
                }
            }
            return newState;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setUserInfo(localInfo);
        navigate('/select');
    };

    const handleProductClick = (product: Product) => {
        // 1. Check path (console log)
        console.log("이동할 상품 ID:", product.id);

        // 2. Navigate
        if (product.id) {
            navigate(`/tour-detail/${product.id}`);
        } else {
            alert("상품 정보를 불러올 수 없습니다.");
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #1a202c 0%, #2d3748 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            color: '#fff',
            fontFamily: "'Inter', sans-serif"
        }}>
            {/* Header ... */}
            <div style={{ textAlign: 'center', margin: '60px 0 40px', position: 'relative' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <h1 style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '4.5rem',
                        fontWeight: 900,
                        color: '#fff',
                        lineHeight: '0.9',
                        margin: 0,
                        textTransform: 'uppercase',
                        letterSpacing: '-2px',
                        textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                        PHUKET
                    </h1>
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        right: '-35px',
                        transform: 'rotate(5deg)'
                    }}>
                        <Plane size={36} color="#E5B80B" fill="#E5B80B" strokeWidth={1.5} />
                    </div>
                </div>

                <h2 style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '4.5rem',
                    fontWeight: 900,
                    color: '#E5B80B',
                    margin: '0',
                    lineHeight: '1',
                    textTransform: 'uppercase',
                    letterSpacing: '-2px',
                    textShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}>
                    LASTDAY
                </h2>

                <p style={{
                    color: 'rgba(255,255,255,0.9)',
                    marginTop: '20px',
                    fontSize: '1.2rem',
                    fontWeight: 300,
                    letterSpacing: '0.5px',
                    fontFamily: "'Outfit', sans-serif"
                }}>
                    푸켓 마지막 날, 완벽한 여정 만들기
                </p>
            </div>

            <form onSubmit={handleSubmit} style={{
                width: '100%',
                maxWidth: '400px',
                background: 'rgba(0, 0, 0, 0.6)',
                padding: '30px',
                borderRadius: '24px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                zIndex: 10
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#D4AF37', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>성함</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={localInfo.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="예: 홍길동"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                        <Users size={18} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#D4AF37', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>탑승 인원</label>
                    <div style={{ position: 'relative' }}>
                        <select
                            value={localInfo.personCount}
                            onChange={(e) => handleChange('personCount', Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                outline: 'none',
                                fontSize: '1rem',
                                appearance: 'none'
                            }}
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
                                <option key={num} value={num} style={{ background: '#2d3748' }}>{num}명</option>
                            ))}
                        </select>
                        <Users size={18} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                </div>

                {/* Vehicle Selection */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', color: '#D4AF37', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>차량 선택</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={() => handleChange('vehicleType', 'SEDAN')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid',
                                borderColor: localInfo.vehicleType === 'SEDAN' ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                                background: localInfo.vehicleType === 'SEDAN' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: localInfo.vehicleType === 'SEDAN' ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                fontWeight: 700,
                                transition: 'all 0.2s'
                            }}
                        >
                            Sedan (1-3인)
                        </button>
                        <button
                            type="button"
                            onClick={() => handleChange('vehicleType', 'VAN')}
                            style={{
                                flex: 1,
                                padding: '12px',
                                borderRadius: '12px',
                                border: '1px solid',
                                borderColor: localInfo.vehicleType === 'VAN' ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                                background: localInfo.vehicleType === 'VAN' ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255,255,255,0.05)',
                                color: localInfo.vehicleType === 'VAN' ? '#D4AF37' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                fontWeight: 700,
                                transition: 'all 0.2s'
                            }}
                        >
                            Van (4-11인)
                        </button>
                    </div>
                    {(localInfo.vehicleType === 'SEDAN' && localInfo.personCount >= 3) && (
                        <p style={{ fontSize: '0.8rem', color: '#eab308', marginTop: '8px', display: 'flex', gap: '4px', alignItems: 'center' }}>
                            ⚠️ 성인 3인 이상이거나 짐이 많으실 경우, 쾌적한 이동을 위해 'Van'을 권장합니다.
                        </p>
                    )}
                </div>

                <div style={{ marginBottom: '20px' }} ref={hotelInputRef}>
                    <label style={{ display: 'block', color: '#D4AF37', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>출발 장소 (호텔명)</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={hotelQuery}
                            onChange={(e) => handleHotelSearch(e.target.value)}
                            onFocus={() => {
                                if (hotelQuery === '' || filteredHotels.length === 0) setFilteredHotels(PHUKET_HOTELS);
                                setShowHotelDropdown(true);
                            }}
                            placeholder="호텔명을 입력하세요 (예: 블루 몽키)"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 40px 12px 40px',
                                borderRadius: '12px',
                                border: '1px solid',
                                borderColor: showHotelDropdown ? '#D4AF37' : 'rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                outline: 'none',
                                fontSize: '1rem',
                                transition: 'all 0.2s'
                            }}
                        />
                        <HotelIcon size={18} color={showHotelDropdown ? '#D4AF37' : 'rgba(255,255,255,0.5)'} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                        <MapPin size={18} color="rgba(212, 175, 55, 0.8)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} />

                        <style>{`
                            .custom-scrollbar::-webkit-scrollbar {
                                width: 6px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-track {
                                background: rgba(0,0,0,0.3);
                                borderRadius: 3px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb {
                                background: #D4AF37;
                                borderRadius: 3px;
                            }
                            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                background: #FDC700;
                            }
                        `}</style>
                        {/* Dropdown */}
                        {showHotelDropdown && (
                            <div
                                className="custom-scrollbar"
                                style={{
                                    position: 'absolute',
                                    top: '100%',
                                    left: 0,
                                    right: 0,
                                    marginTop: '4px',
                                    background: 'rgba(26, 32, 44, 0.98)',
                                    borderRadius: '12px',
                                    border: '1px solid rgba(212, 175, 55, 0.5)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                                    zIndex: 100,
                                    maxHeight: '200px',
                                    overflowY: 'auto',
                                    backdropFilter: 'blur(12px)'
                                }}>
                                {filteredHotels.length > 0 ? (
                                    filteredHotels.map(hotel => (
                                        <div
                                            key={hotel.id}
                                            onClick={() => selectHotel(hotel)}
                                            style={{
                                                padding: '12px 16px',
                                                borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                        >
                                            <div style={{ color: '#D4AF37', fontWeight: 'bold', fontSize: '0.95rem' }}>{hotel.nameKo}</div>
                                            <div style={{ color: '#aaa', fontSize: '0.8rem' }}>{hotel.nameEn}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '12px 16px', color: '#aaa', fontSize: '0.9rem' }}>검색 결과가 없습니다.</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', color: '#D4AF37', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>항공편명</label>
                    <div style={{ position: 'relative' }}>
                        <input
                            type="text"
                            value={localInfo.flight}
                            onChange={(e) => handleChange('flight', e.target.value)}
                            placeholder="예: KE638"
                            required
                            style={{
                                width: '100%',
                                padding: '12px 12px 12px 40px',
                                borderRadius: '12px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                        <Plane size={18} color="rgba(255,255,255,0.5)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    </div>
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '16px',
                        background: 'linear-gradient(45deg, #D4AF37 0%, #FDC700 100%)',
                        backgroundColor: '#D4AF37',
                        border: 'none',
                        borderRadius: '12px',
                        color: '#000',
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    GENERATE MY PLAN
                </button>
            </form>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <a
                    href="http://pf.kakao.com/_rxbHRX"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'color 0.2s',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = '#FEE500'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.5)'}
                >
                    Need Help? <span style={{ textDecoration: 'underline' }}>KakaoTalk us!</span>
                </a>
            </div>

            {/* Products Section */}
            <div style={{ width: '100%', maxWidth: '1200px', margin: '60px auto 40px', padding: '0 40px', boxSizing: 'border-box' }}>
                <ProductCarousel onProductClick={handleProductClick} />
            </div>

        </div>
    );
};

export default JourneyStartScreen;
