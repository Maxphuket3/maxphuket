import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Info, CheckCircle, XCircle, Car, AlertTriangle, CreditCard, MessageCircle, Calendar, Calculator, Clock, Briefcase, MapPin } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
    const [activeTab, setActiveTab] = useState<'INTRO' | 'INCLUSION' | 'VEHICLE' | 'REFUND' | 'ESTIMATE'>('INTRO');

    // Estimate State
    const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
    const [isPaidPickup, setIsPaidPickup] = useState(false);
    const [selectedPickupOptionIdx, setSelectedPickupOptionIdx] = useState(-1); // For products with variable pickup options
    const [luggageCount, setLuggageCount] = useState(0);
    const [timeSlot, setTimeSlot] = useState('18:00');
    const [adultCount, setAdultCount] = useState(2);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);

    // Similan Special State
    const [pickupHotel, setPickupHotel] = useState('');
    const [dropoffHotel, setDropoffHotel] = useState('');
    const [isMoveHotel, setIsMoveHotel] = useState(false);
    const [luggageSmall, setLuggageSmall] = useState(0); // 20" ↓
    const [luggageMedium, setLuggageMedium] = useState(0); // 21-29"
    const [luggageLarge, setLuggageLarge] = useState(0); // 30" ↑

    // Reset state when product changes
    React.useEffect(() => {
        if (product) {
            setSelectedCourseIdx(0);
            setIsPaidPickup(false);
            setSelectedPickupOptionIdx(-1);
            setLuggageCount(0);
            setAdultCount(2);
            setChildCount(0);
            setInfantCount(0);
            // Similan Reset
            setPickupHotel('');
            setDropoffHotel('');
            setIsMoveHotel(false);
            setLuggageSmall(0);
            setLuggageMedium(0);
            setLuggageLarge(0);

            // Set default time based on product type
            if (product.id === 'p_simon') setTimeSlot('18:00');
            else setTimeSlot('08:30');
        }
    }, [product]);

    if (!product) return null;

    // Price Calculation
    const totalAmount = useMemo(() => {
        if (!product || !product.courses) return 0;
        const course = product.courses[selectedCourseIdx];
        if (!course) return 0;

        const parsePrice = (str: string) => parseInt(str.replace(/[^0-9]/g, '')) || 0;

        const adultPrice = parsePrice(course.priceAdult);
        const childPrice = parsePrice(course.priceChild);

        let basePrice = (adultPrice * adultCount) + (childPrice * childCount);
        let mandatoryFees = 0;
        let pickupFee = 0;
        let luggageTotalInfo = 0;

        // 1. Mandatory On-site Fees
        if (product.onSiteFees) {
            mandatoryFees += (product.onSiteFees.entranceAdult * adultCount);
            mandatoryFees += (product.onSiteFees.entranceChild * childCount);
            mandatoryFees += (product.onSiteFees.guideTip * (adultCount + childCount));
        }

        // 2. Pickup Surcharge Logic
        if (product.pickupZones) {
            const totalPax = adultCount + childCount;
            // Find matching zone
            const location = pickupHotel.toLowerCase().trim();
            if (location) {
                const matchedZone = product.pickupZones.find(z =>
                    z.zones.some(zoneName => location.includes(zoneName.toLowerCase()))
                );

                if (matchedZone) {
                    if (totalPax <= 3) pickupFee = matchedZone.priceCar;
                    else pickupFee = matchedZone.priceVan;
                }
            }
        } else if (product.pickupOptions) {
            if (selectedPickupOptionIdx !== -1 && product.pickupOptions[selectedPickupOptionIdx]) {
                const pPrice = product.pickupOptions[selectedPickupOptionIdx].price;
                pickupFee += pPrice * (adultCount + childCount);
            }
        } else {
            // Standard fallback
            if (isPaidPickup) pickupFee += 2500;
        }

        // 3. Luggage Logic
        if (product.category === 'SIMILAN') {
            const totalBags = luggageSmall + luggageMedium + luggageLarge;
            const pricePerBag = product.luggagePrice || 200;
            // Simplified logic as requested or standard
            luggageTotalInfo = (luggageMedium + luggageLarge) * pricePerBag;
        } else {
            const pricePerBag = product.carrierFeePerUnit || product.luggagePrice || 300;
            luggageTotalInfo = luggageCount * pricePerBag;
        }

        return basePrice + mandatoryFees + pickupFee + luggageTotalInfo;
    }, [product, selectedCourseIdx, adultCount, childCount, infantCount, pickupHotel, selectedPickupOptionIdx, isPaidPickup, luggageCount, luggageSmall, luggageMedium, luggageLarge]);

    const calculateTotal = () => totalAmount.toLocaleString();

    const generateQuote = () => {
        const total = calculateTotal();
        const baseMsg = `[라스트테이 견적 문의]\n상품명: ${product.name}\n일정: ${timeSlot}\n인원: 성인${adultCount} 아동${childCount} 유아${infantCount}`;

        // Pickup Info
        let pickupMsg = `\n픽업: ${pickupHotel || '미정'}\n샌딩: ${dropoffHotel || pickupHotel || '(동일)'}`;

        // Similan Logic
        if (product.category === 'SIMILAN') {
            const luggMsg = `수하물: 소${luggageSmall} 중${luggageMedium} 대${luggageLarge}`;
            return `${baseMsg}${pickupMsg}\n${luggMsg}\n----------------\n예상 견적: ${total} THB\n*지역에 따라 단독차량 비용이 추가될 수 있습니다.`;
        }

        // Standard Logic
        let extraMsg = '';
        if (product.onSiteFees) extraMsg += '\n(현장지불금/입장료 포함)';
        if (product.pickupZones && pickupHotel) extraMsg += '\n(지역별 픽업추가금 적용됨)';
        const standardLuggMsg = ((product.luggagePrice || product.hasCarrierOption) && luggageCount > 0) ? `\n수하물: ${luggageCount}개` : '';

        return `${baseMsg}${pickupMsg}${standardLuggMsg}${extraMsg}\n----------------\n예상 견적: ${total} THB`;
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'INTRO':
                return (
                    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <h3 style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Info size={20} /> 상품 소개
                        </h3>
                        <p style={{ color: '#e2e8f0', lineHeight: '1.8', fontSize: '1rem', marginBottom: '24px' }}>
                            {product.description || '상세 설명이 없습니다.'}
                        </p>

                        {product.highlights && product.highlights.length > 0 && (
                            <>
                                <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '12px' }}>✨ 핵심 포인트</h4>
                                <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '10px' }}>
                                    {product.highlights.map((item, idx) => (
                                        <li key={idx} style={{ display: 'flex', alignItems: 'start', gap: '10px', color: '#cbd5e0' }}>
                                            <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37', marginTop: '8px' }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}

                        {product.importantNotes && product.importantNotes.length > 0 && (
                            <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(245, 101, 101, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 101, 101, 0.3)' }}>
                                <h4 style={{ color: '#fc8181', fontSize: '1.1rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <AlertTriangle size={18} /> 필수 안내 및 주의사항
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px' }}>
                                    {product.importantNotes.map((note, i) => (
                                        <li key={i} style={{ color: '#fed7d7', fontSize: '0.95rem', display: 'flex', gap: '8px', lineHeight: '1.5' }}>
                                            <span>•</span> {note}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {product.id === 'p_simon' && (
                            <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                <h4 style={{ color: '#D4AF37', fontSize: '1.1rem', marginBottom: '12px' }}>🎭 공연장 안내</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <div style={{ background: '#000', padding: '10px', borderRadius: '8px', textAlign: 'center', color: '#aaa', fontSize: '0.8rem' }}>
                                        입장 게이트 (1층)
                                    </div>
                                    <div style={{ background: '#000', padding: '10px', borderRadius: '8px', textAlign: 'center', color: '#aaa', fontSize: '0.8rem' }}>
                                        매표소 (QR 교환)
                                    </div>
                                </div>
                                <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#cbd5e0' }}>
                                    * 구글 지도에 'Simon Cabaret Phuket' 검색<br />
                                    * 공연 시작 20분 전까지 도착 권장
                                </p>
                            </div>
                        )}
                    </div>
                );
            case 'INCLUSION':
                return (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px' }}>
                            <h3 style={{ color: '#48bb78', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle size={20} /> 포함 사항
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                                {product.inclusions?.map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                                        <CheckCircle size={16} color="#48bb78" /> {item}
                                    </li>
                                )) || <li style={{ color: '#718096' }}>정보 없음</li>}
                            </ul>
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px', borderRadius: '12px' }}>
                            <h3 style={{ color: '#f56565', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <XCircle size={20} /> 불포함 사항
                            </h3>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '12px' }}>
                                {product.exclusions?.map((item, idx) => (
                                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                                        <XCircle size={16} color="#f56565" /> {item}
                                    </li>
                                )) || <li style={{ color: '#718096' }}>정보 없음</li>}
                            </ul>
                        </div>
                    </div>
                );
            case 'VEHICLE':
                return (
                    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <h3 style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Car size={20} /> 차량 및 이동 정보
                            </h3>
                            <p style={{ color: '#e2e8f0', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                                {product.vehicleInfo || '차량 정보가 없습니다.'}
                            </p>
                        </div>

                        {/* Explicitly show Pickup Costs if available */}
                        {(product.pickupZones || product.pickupOptions) && (
                            <div style={{ marginBottom: '30px', background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '12px' }}>
                                <h4 style={{ color: '#90cdf4', fontSize: '1rem', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MapPin size={16} /> 지역별 픽업 추가 비용
                                </h4>
                                {product.pickupZones ? (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px' }}>
                                        {product.pickupZones.map((zone, idx) => (
                                            <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '4px' }}>
                                                <span style={{ maxWidth: '60%' }}>{zone.zones.join(', ')}</span>
                                                <span style={{ color: '#D4AF37', whiteSpace: 'nowrap' }}>
                                                    {zone.priceCar > 0 ? `승용차 ${zone.priceCar}B / 밴 ${zone.priceVan}B` : '무료'}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : product.pickupOptions ? (
                                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '8px' }}>
                                        {product.pickupOptions.map((opt, idx) => (
                                            <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', color: '#e2e8f0', fontSize: '0.9rem' }}>
                                                <span>{opt.name}</span>
                                                <span style={{ color: '#D4AF37' }}>+{opt.price} THB</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </div>
                        )}

                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CreditCard size={20} /> 추가 비용 안내
                            </h3>
                            <p style={{ color: '#e2e8f0', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                                {product.pricePolicy || '추가 비용 정보가 없습니다.'}
                            </p>
                        </div>

                        {/* Driver Communication - Line */}
                        {/* Driver Communication / Pickup Info */}
                        {product.category === 'SIMILAN' ? (
                            <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Similan Pickup Notice */}
                                <div style={{
                                    padding: '24px',
                                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, rgba(20, 20, 20, 0.5) 100%)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(212, 175, 55, 0.3)',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
                                }}>
                                    <h4 style={{ color: '#D4AF37', fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Info size={22} fill="rgba(212, 175, 55, 0.2)" /> 픽업 안내 (업체 공동 픽업)
                                    </h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        <p style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
                                            <span style={{ color: '#fff', fontWeight: 'bold' }}>본 투어는 업체 전용 픽업 차량으로 진행됩니다.</span><br />
                                            별도의 개인 기사 배정은 없으며, 모든 픽업 관련 문의는 아래 <span style={{ color: '#FEE500', fontWeight: 'bold' }}>카카오톡 공식 채널</span>을 이용해 주세요.
                                        </p>

                                        <div style={{
                                            padding: '16px',
                                            background: 'rgba(245, 101, 101, 0.1)',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(245, 101, 101, 0.2)'
                                        }}>
                                            <p style={{ color: '#fc8181', fontSize: '1rem', fontWeight: 'bold', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <AlertTriangle size={18} /> 호텔 로비 대기 시간 엄수!
                                            </p>
                                            <p style={{ color: '#fed7d7', fontSize: '0.9rem', margin: 0, paddingLeft: '26px' }}>
                                                정해진 픽업 시간에 늦으실 경우 차량이 출발하며, 이 경우 환불이 불가합니다. 10분 전 대기를 권장합니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Visual Enhancement - Boat Image / Inclusions */}
                                <div style={{
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    height: '240px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                                }}>
                                    <img
                                        src={product.detailImage || product.thumbnail}
                                        alt="Tour Boat"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                                    />
                                    <div style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                                        padding: '24px'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                            <div>
                                                <span style={{
                                                    background: '#D4AF37', color: '#000', fontSize: '0.75rem', fontWeight: 'bold',
                                                    padding: '4px 10px', borderRadius: '100px', display: 'inline-block', marginBottom: '8px'
                                                }}>
                                                    PREMIUM BOAT
                                                </span>
                                                <h5 style={{ color: '#fff', fontSize: '1.3rem', margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                                                    {product.name}
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Removed Driver Line Contact for standard tours as requested
                            null
                        )}
                    </div>
                );
            case 'REFUND':
                return (
                    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div style={{ background: 'rgba(245, 101, 101, 0.1)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(245, 101, 101, 0.2)' }}>
                            <h3 style={{ color: '#fc8181', fontSize: '1.2rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={20} /> 취소 및 환불 규정
                            </h3>
                            <p style={{ color: '#fed7d7', lineHeight: '1.8' }}>
                                {product.cancellationPolicy || '기본 취소 규정을 따릅니다.'}
                            </p>
                            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.9rem', color: '#cbd5e0' }}>
                                ※ 예약 확정 후 날짜 변경 및 취소가 절대 불가합니다.<br />
                                ※ 노쇼(No-Show)의 경우 전액 위약금이 발생합니다.
                            </div>
                        </div>
                    </div>
                );
            case 'ESTIMATE':
                return (
                    <div style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
                        {product.courses ? (
                            <div className="booking-section estimate-input-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {/* Course Selection */}
                                <div>
                                    <h3 style={{ color: '#D4AF37', fontSize: '1.1rem', marginBottom: '12px' }}>
                                        {product.id === 'p_simon' ? '좌석 등급 선택' : '코스 선택'}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
                                        {product.courses.map((course, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => setSelectedCourseIdx(idx)}
                                                style={{
                                                    flex: 1,
                                                    minWidth: '140px',
                                                    padding: '16px',
                                                    borderRadius: '12px',
                                                    border: selectedCourseIdx === idx ? '2px solid #D4AF37' : '1px solid rgba(255,255,255,0.2)',
                                                    background: selectedCourseIdx === idx ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.05)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '4px' }}>{course.name}</div>
                                                <div style={{ color: '#D4AF37', fontSize: '0.9rem' }}>{course.priceAdult}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Common Options (Date/Pax) */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <h3 style={{ color: '#D4AF37', fontSize: '1.1rem', marginBottom: '12px' }}>일정 및 인원</h3>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#cbd5e0' }}><Clock size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                                                    {product.id === 'p_simon' ? '공연 시간' : '출발/픽업'}
                                                </span>
                                                <select
                                                    value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}
                                                    style={{ background: '#2d3748', color: '#fff', border: '1px solid #4a5568', padding: '6px', borderRadius: '6px' }}
                                                >
                                                    {product.id === 'p_simon' ? (
                                                        <>
                                                            <option value="18:00">18:00 (1부)</option>
                                                            <option value="19:30">19:30 (2부)</option>
                                                            <option value="21:00">21:00 (3부)</option>
                                                        </>
                                                    ) : product.category === 'SIMILAN' ? (
                                                        <option value="06:00">06:00 - 08:00 (픽업 위치별 상이)</option>
                                                    ) : (
                                                        <>
                                                            <option value="08:30">오전 08:30</option>
                                                            <option value="10:00">오전 10:00</option>
                                                            <option value="13:30">오후 13:30</option>
                                                        </>
                                                    )}
                                                </select>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#cbd5e0' }}>성인 (12세~)</span>
                                                <input
                                                    type="number" min="1" value={adultCount} onChange={(e) => setAdultCount(parseInt(e.target.value) || 0)}
                                                    style={{ width: '60px', background: '#2d3748', color: '#fff', border: '1px solid #4a5568', padding: '6px', borderRadius: '6px', textAlign: 'center' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#cbd5e0' }}>
                                                    아동 {product.id === 'p_simon' ? '(키 140cm↓)' : ''}
                                                </span>
                                                <input
                                                    type="number" min="0" value={childCount} onChange={(e) => setChildCount(parseInt(e.target.value) || 0)}
                                                    style={{ width: '60px', background: '#2d3748', color: '#fff', border: '1px solid #4a5568', padding: '6px', borderRadius: '6px', textAlign: 'center' }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ color: '#718096', fontSize: '0.9rem' }}>유아 (좌석X)</span>
                                                <input
                                                    type="number" min="0" value={infantCount} onChange={(e) => setInfantCount(parseInt(e.target.value) || 0)}
                                                    style={{ width: '60px', background: '#1a202c', color: '#718096', border: '1px solid rgba(255,255,255,0.1)', padding: '6px', borderRadius: '6px', textAlign: 'center' }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Options (Dynamic) */}
                                    <div>
                                        <h3 style={{ color: '#D4AF37', fontSize: '1.1rem', marginBottom: '12px' }}>추가 옵션</h3>

                                        {/* SIMILAN SPECIAL UI */}
                                        {product.category === 'SIMILAN' ? (
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {/* Hotel Inputs - Always Visible & Separated */}
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                    <div>
                                                        <label style={{ display: 'block', color: '#cbd5e0', fontSize: '0.85rem', marginBottom: '4px' }}>픽업 호텔 (출발)</label>
                                                        <input
                                                            type="text"
                                                            placeholder="호텔 영문명 또는 한글명"
                                                            value={pickupHotel}
                                                            onChange={(e) => setPickupHotel(e.target.value)}
                                                            style={{ width: '100%', padding: '10px', background: '#2d3748', border: '1px solid #4a5568', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label style={{ display: 'block', color: '#cbd5e0', fontSize: '0.85rem', marginBottom: '4px' }}>샌딩 호텔 (드랍/이동)</label>
                                                        <input
                                                            type="text"
                                                            placeholder="체크아웃 투어 시 필수 입력"
                                                            value={dropoffHotel}
                                                            onChange={(e) => setDropoffHotel(e.target.value)}
                                                            style={{ width: '100%', padding: '10px', background: '#2d3748', border: '1px solid #4a5568', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Luggage Inputs */}
                                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '8px', marginTop: '4px' }}>
                                                    <div style={{ fontSize: '0.85rem', color: '#a0aec0', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                                        <span>캐리어/수하물</span>
                                                        <span style={{ color: '#D4AF37' }}>
                                                            {product.luggagePrice ? `개당 ${product.luggagePrice}B (21인치↑)` : '개당 200B'}
                                                        </span>
                                                    </div>
                                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', textAlign: 'center' }}>
                                                        <div>
                                                            <div style={{ fontSize: '0.7rem', color: '#718096' }}>20"↓</div>
                                                            <input type="number" min="0" value={luggageSmall} onChange={(e) => setLuggageSmall(parseInt(e.target.value) || 0)} style={{ width: '100%', background: '#1a202c', border: '1px solid #4a5568', color: '#fff', borderRadius: '4px', textAlign: 'center' }} />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '0.7rem', color: '#718096' }}>21~29"</div>
                                                            <input type="number" min="0" value={luggageMedium} onChange={(e) => setLuggageMedium(parseInt(e.target.value) || 0)} style={{ width: '100%', background: '#1a202c', border: '1px solid #4a5568', color: '#fff', borderRadius: '4px', textAlign: 'center' }} />
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '0.7rem', color: '#718096' }}>30"↑</div>
                                                            <input type="number" min="0" value={luggageLarge} onChange={(e) => setLuggageLarge(parseInt(e.target.value) || 0)} style={{ width: '100%', background: '#1a202c', border: '1px solid #4a5568', color: '#fff', borderRadius: '4px', textAlign: 'center' }} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            // NON-SIMILAN standard options
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                {product.pickupOptions ? (
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                        <span style={{ color: '#cbd5e0', fontSize: '0.95rem' }}><MapPin size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> 픽업 지역 (1인 편도)</span>
                                                        <select
                                                            value={selectedPickupOptionIdx}
                                                            onChange={(e) => setSelectedPickupOptionIdx(parseInt(e.target.value))}
                                                            style={{ background: '#2d3748', color: '#fff', border: '1px solid #4a5568', padding: '10px', borderRadius: '6px', width: '100%' }}
                                                        >
                                                            <option value={-1}>픽업 없음 (개별 이동)</option>
                                                            {product.pickupOptions.map((opt, idx) => (
                                                                <option key={idx} value={idx}>
                                                                    {opt.name} (+{opt.price} THB)
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                ) : (
                                                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#cbd5e0' }}>
                                                        <input
                                                            type="checkbox" checked={isPaidPickup} onChange={(e) => setIsPaidPickup(e.target.checked)}
                                                            style={{ transform: 'scale(1.2)' }}
                                                        />
                                                        <span>
                                                            <span style={{ display: 'block' }}>유료 픽업 지역</span>
                                                            <span style={{ fontSize: '0.8rem', color: '#718096' }}>+2,500 THB (차량 1대)</span>
                                                        </span>
                                                    </label>
                                                )}

                                                {/* Hotel Inputs for Standard Tours */}
                                                <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                        <div>
                                                            <label style={{ display: 'block', color: '#cbd5e0', fontSize: '0.85rem', marginBottom: '4px' }}>픽업 호텔</label>
                                                            <input
                                                                type="text"
                                                                placeholder="픽업 장소 입력"
                                                                value={pickupHotel}
                                                                onChange={(e) => setPickupHotel(e.target.value)}
                                                                style={{ width: '100%', padding: '10px', background: '#2d3748', border: '1px solid #4a5568', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label style={{ display: 'block', color: '#cbd5e0', fontSize: '0.85rem', marginBottom: '4px' }}>샌딩 호텔</label>
                                                            <input
                                                                type="text"
                                                                placeholder="드랍 장소 (미입력 시 픽업지와 동일)"
                                                                value={dropoffHotel}
                                                                onChange={(e) => setDropoffHotel(e.target.value)}
                                                                style={{ width: '100%', padding: '10px', background: '#2d3748', border: '1px solid #4a5568', borderRadius: '6px', color: '#fff', fontSize: '0.9rem' }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Baggage Input - Only if luggagePrice is set OR hasCarrierOption is true */}
                                                {/* Baggage / Carrier Option Input */}
                                                {(product.luggagePrice !== undefined || product.hasCarrierOption) && (
                                                    <div className="carrier-option-box" style={{
                                                        marginTop: '12px',
                                                        background: 'rgba(255,255,255,0.05)',
                                                        padding: '16px',
                                                        borderRadius: '12px',
                                                        border: '1px solid rgba(255,255,255,0.1)'
                                                    }}>
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                                            <label style={{ color: '#cbd5e0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                                                                <Briefcase size={18} />
                                                                {product.hasCarrierOption ? '캐리어 보관 (개당 200바트)' : `수하물 개수 (개당 ${product.luggagePrice}B)`}
                                                            </label>
                                                        </div>

                                                        <div className="counter-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', background: '#2d3748', padding: '8px', borderRadius: '8px' }}>
                                                            <button
                                                                onClick={() => setLuggageCount(prev => Math.max(0, prev - 1))}
                                                                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #4a5568', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}
                                                            >
                                                                -
                                                            </button>
                                                            <span style={{ fontSize: '1.1rem', fontWeight: 'bold', minWidth: '40px', textAlign: 'center', color: '#fff' }}>{luggageCount} 개</span>
                                                            <button
                                                                onClick={() => setLuggageCount(prev => prev + 1)}
                                                                style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #D4AF37', background: '#D4AF37', color: '#000', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold' }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>

                                                        <p className="fee-notice" style={{ textAlign: 'right', marginTop: '12px', color: '#D4AF37', fontSize: '0.9rem', margin: '12px 0 0 0' }}>
                                                            추가 비용: {(luggageCount * (product.carrierFeePerUnit || product.luggagePrice || 0)).toLocaleString()} 바트
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Private Van Warning for SIMILAN */}
                                {product.category === 'SIMILAN' && (isMoveHotel || dropoffHotel) && (
                                    <div style={{
                                        padding: '16px',
                                        background: 'rgba(255, 165, 0, 0.1)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255, 165, 0, 0.3)',
                                        display: 'flex',
                                        gap: '12px',
                                        alignItems: 'start'
                                    }}>
                                        <AlertTriangle color="#F6E05E" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                                        <div>
                                            <p style={{ color: '#F6E05E', fontWeight: 'bold', fontSize: '0.95rem', margin: '0 0 4px 0' }}>
                                                지역 변경 / 외곽 지역 안내
                                            </p>
                                            <p style={{ color: '#cbd5e0', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                                                픽업 및 드랍 장소가 다르거나 공항/북부 지역(나이양, 마이카오 등) 이동 시,
                                                업체 규정에 따라 <span style={{ color: '#fff', fontWeight: 'bold' }}>단독 차량(전용 밴)</span> 이용이 필수일 수 있습니다.
                                                <br />(예상 비용: +2,000 ~ 2,500 THB / 현장 지불 가능)
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Total Price */}
                                <div>
                                    <div className="price-summary-section" style={{
                                        marginTop: '10px',
                                        padding: '10px 0', /* reduced padding */
                                        background: 'transparent',
                                        /* Removed heavy border/bg */
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center'
                                    }}>
                                        <div>
                                            {/* Hide title if needed via class or simplify */}
                                            {/* <div className="contact-title" style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '4px' }}>최종 결제 예정 금액</div> */}
                                            <div style={{ color: '#D4AF37', fontSize: '1.4rem', fontWeight: '900' }}>{calculateTotal()} THB</div>
                                        </div>
                                        {/* Removed footer note */}
                                    </div>

                                    {/* 
                                    <section className="contact-box">
                                      <h3>고객님에게 문의하기</h3>
                                      <button className="kakao-btn">카카오톡으로 빠른상담</button>
                                    </section> 
                                    */}

                                    {/* <button
                                        onClick={() => {
                                            const quote = generateQuote();
                                            navigator.clipboard.writeText(quote);
                                            alert(`견적이 복사되었습니다!\n카카오톡 상담창에 '붙여넣기' 해주세요.\n\n${quote}`);
                                            window.open('http://pf.kakao.com/_rxbHRX', '_blank');
                                        }}
                                        className="kakao-banner-button"
                                        style={{
                                            background: '#FEE500',
                                            color: '#000',
                                            textDecoration: 'none',
                                            fontWeight: 'bold',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '6px',
                                            marginTop: '10px',
                                            transition: 'all 0.2s',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <MessageCircle size={16} />
                                        카카오톡 채팅 상담
                                    </button> */}
                                    <div style={{ textAlign: 'center', marginTop: '6px', fontSize: '0.8rem', color: '#718096' }}>
                                        견적 내용이 자동으로 복사됩니다.
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ padding: '40px', textAlign: 'center', color: '#a0aec0' }}>
                                이 상품은 견적 계산기를 지원하지 않습니다.
                                <br />카카오톡으로 문의해주세요.
                            </div>
                        )}
                    </div>
                );
        }
    };

    return createPortal(
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(8px)',
                zIndex: 2000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', // Center vertically for better desktop view
                padding: '20px'
            }}
            onClick={onClose}
        >
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1a202c; 
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4a5568; 
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #718096; 
                }
            `}</style>

            <div
                style={{
                    width: '100%',
                    maxWidth: '900px',
                    backgroundColor: '#1a202c',
                    borderRadius: '24px',
                    overflow: 'hidden', // Contain content
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    maxHeight: '90vh', // Limit height
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        right: '20px',
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '50%',
                        padding: '8px',
                        cursor: 'pointer',
                        color: '#fff',
                        zIndex: 10,
                        transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
                >
                    <X size={24} />
                </button>

                {/* Header Image Area */}
                <div style={{ height: '250px', position: 'relative', flexShrink: 0 }}>
                    <img
                        src={product.detailImage || product.thumbnail}
                        alt={product.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #1a202c 0%, transparent 100%)' }} />
                    <div style={{ position: 'absolute', bottom: '20px', left: '24px', right: '24px' }}>
                        <div style={{
                            background: '#D4AF37', color: '#000', padding: '4px 12px', borderRadius: '4px',
                            display: 'inline-block', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px'
                        }}>
                            BEST CHOICE
                        </div>
                        <h2 style={{ color: '#fff', fontSize: '2rem', margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {product.name}
                        </h2>
                        <p style={{ color: '#D4AF37', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                            {product.price}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{
                    display: 'flex',
                    borderBottom: '1px solid rgba(255,255,255,0.1)',
                    background: '#232d3f',
                    flexShrink: 0,
                    overflowX: 'auto'
                }}>
                    {[
                        { id: 'INTRO', label: '상품 소개', icon: Info },
                        { id: 'INCLUSION', label: '포함/불포함', icon: CheckCircle },
                        { id: 'VEHICLE', label: '차량/비용', icon: Car },
                        { id: 'REFUND', label: '취소 규정', icon: AlertTriangle },
                        { id: 'ESTIMATE', label: '견적 계산', icon: Calculator }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            style={{
                                flex: 1,
                                padding: '16px',
                                background: activeTab === tab.id ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                                border: 'none',
                                borderBottom: activeTab === tab.id ? '2px solid #D4AF37' : '2px solid transparent',
                                color: activeTab === tab.id ? '#D4AF37' : 'rgba(255,255,255,0.7)',
                                fontSize: '0.95rem',
                                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content Body */}
                <div
                    className="custom-scrollbar"
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '30px',
                        background: '#1a202c'
                    }}
                >
                    {renderContent()}
                </div>

                {/* Fixed Footer (Hidden as requested) */}
                {/* <div className="product-detail-footer-contact" style={{
                    padding: '20px',
                    background: '#232d3f',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px'
                }}>
                    <div>
                        <p style={{ color: '#a0aec0', fontSize: '0.9rem', marginBottom: '4px' }}>합리적인 가격</p>
                        <p style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold' }}>견적 문의하기</p>
                    </div>
                    <a
                        href="http://pf.kakao.com/_rxbHRX"
                        target="_blank"
                        rel="noreferrer"
                        style={{
                            background: '#FEE500',
                            color: '#000',
                            padding: '14px 24px',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <MessageCircle size={20} fill="#000" />
                        카카오톡으로 빠른 상담
                    </a>
                </div> */}
            </div>
        </div>,
        document.body
    );
};

export default ProductModal;
