import React, { useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Info, CheckCircle, XCircle, Car, AlertTriangle, CreditCard, MessageCircle, Calendar, Calculator, Clock, Briefcase, MapPin } from 'lucide-react';
import { Product } from '../data/products';

interface ProductModalProps {
    product: Product | null;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {


    // Estimate State
    const [selectedCourseIdx, setSelectedCourseIdx] = useState(0);
    const [isPaidPickup, setIsPaidPickup] = useState(false);
    const [selectedPickupOptionIdx, setSelectedPickupOptionIdx] = useState(-1); // For products with variable pickup options
    const [luggageCount, setLuggageCount] = useState(0);
    const [timeSlot, setTimeSlot] = useState('18:00');
    const [adultCount, setAdultCount] = useState(2);
    const [childCount, setChildCount] = useState(0);
    const [infantCount, setInfantCount] = useState(0);
    const [bookingDate, setBookingDate] = useState('');

    // Similan Special State
    const [pickupHotel, setPickupHotel] = useState('');
    const [dropoffHotel, setDropoffHotel] = useState('');
    const [isMoveHotel, setIsMoveHotel] = useState(false);
    const [luggageSmall, setLuggageSmall] = useState(0); // 20" â†“
    const [luggageMedium, setLuggageMedium] = useState(0); // 21-29"
    const [luggageLarge, setLuggageLarge] = useState(0); // 30" â†‘
    const [selectedOptions, setSelectedOptions] = useState<{ [key: number]: number }>({});

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
            setLuggageSmall(0);
            setLuggageMedium(0);
            setLuggageLarge(0);
            setSelectedOptions({});

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

        // 3. Luggage/Carrier Logic (수정된 부분: 기본 개당 200바트)
        const pricePerBag = product.category === 'SIMILAN'
            ? (product.luggagePrice || 200)
            : (product.carrierFeePerUnit || product.luggagePrice || 200);

        if (product.category === 'SIMILAN') {
            luggageTotalInfo = (luggageMedium + luggageLarge) * pricePerBag;
        } else {
            luggageTotalInfo = luggageCount * pricePerBag;
        }

        // 4. Options Logic
        let optionsTotal = 0;
        if (product.options) {
            Object.entries(selectedOptions).forEach(([idx, count]) => {
                const opt = product.options![parseInt(idx)];
                if (opt && count > 0) {
                    optionsTotal += opt.price * count;
                }
            });
        }

        // 5. Special Dinner Pricing (Siam Niramit 등)
        let dinnerTotal = 0;
        if (product.dinnerPricing && selectedOptions[99]) {
            dinnerTotal += product.dinnerPricing.adult * adultCount;
            dinnerTotal += product.dinnerPricing.child * childCount;
        }

        // 최종 합계 계산 (Base + Carrier + Fees + Options + Dinner)
        return basePrice + mandatoryFees + pickupFee + luggageTotalInfo + optionsTotal + dinnerTotal;
    }, [product, selectedCourseIdx, adultCount, childCount, infantCount, pickupHotel, selectedPickupOptionIdx, isPaidPickup, luggageCount, luggageSmall, luggageMedium, luggageLarge, selectedOptions]);

    const calculateTotal = () => totalAmount.toLocaleString();

    const generateQuote = () => {
        const total = calculateTotal();
        const baseMsg = `[ë¼ìŠ¤íŠ¸í…Œì´ ê²¬ì  ë¬¸ì˜]\nìƒí’ˆëª…: ${product.name}\nì¼ì •: ${timeSlot}\nì¸ì›: ì„±ì¸${adultCount} ì•„ë™${childCount} ìœ ì•„${infantCount}`;

        // Pickup Info
        let pickupMsg = `\ní”½ì—…: ${pickupHotel || 'ë¯¸ì •'}\nìƒŒë”©: ${dropoffHotel || pickupHotel || '(ë™ì¼)'}`;

        // Similan Logic
        if (product.category === 'SIMILAN') {
            const luggMsg = `ìˆ˜í•˜ë¬¼: ì†Œ${luggageSmall} ì¤‘${luggageMedium} ëŒ€${luggageLarge}`;
            return `${baseMsg}${pickupMsg}\n${luggMsg}\n----------------\nì˜ˆìƒ ê²¬ì : ${total} THB\n*ì§€ì—­ì— ë”°ë¼ ë‹¨ë…ì°¨ëŸ‰ ë¹„ìš©ì´ ì¶”ê°€ë  ìˆ˜ ìžˆìŠµë‹ˆë‹¤.`;
        }

        // Standard Logic
        let extraMsg = '';
        if (product.onSiteFees) extraMsg += '\n(í˜„ìž¥ì§€ë¶ˆê¸ˆ/ìž…ìž¥ë£Œ í¬í•¨)';
        if (product.pickupZones && pickupHotel) extraMsg += '\n(ì§€ì—­ë³„ í”½ì—…ì¶”ê°€ê¸ˆ ì ìš©ë¨)';
        const standardLuggMsg = ((product.luggagePrice || product.hasCarrierOption) && luggageCount > 0) ? `\nìˆ˜í•˜ë¬¼: ${luggageCount}ê°œ` : '';

        return `${baseMsg}${pickupMsg}${standardLuggMsg}${extraMsg}\n----------------\nì˜ˆìƒ ê²¬ì : ${total} THB`;
    };



    // --- Helpers / Constants ---
    const carrierCount = luggageCount;
    const decreaseCarrier = () => setLuggageCount(Math.max(0, luggageCount - 1));
    const increaseCarrier = () => setLuggageCount(luggageCount + 1);

    const totalPrice = calculateTotal();

    const handleKakaoLink = () => {
        const tourName = `${product.name} (${product.courses?.[selectedCourseIdx]?.name || '기본'})`;
        const dateStr = bookingDate ? `${bookingDate} ${timeSlot}` : timeSlot;
        const adults = adultCount;
        const children = childCount;

        // Calculate Carrier Price
        let carrierMsg = '';
        if (carrierCount > 0) {
            const pricePerBag = product.category === 'SIMILAN' ? (product.luggagePrice || 200) : (product.carrierFeePerUnit || product.luggagePrice || 200);
            const cTotal = carrierCount * pricePerBag;
            carrierMsg = `\n🧳 캐리어: ${carrierCount}개 (+${cTotal.toLocaleString()}바트)`;
        }

        // Options Msg
        let optionsMsg = '';
        if (product.id === 'siam-niramit' && selectedOptions[99]) {
            optionsMsg += '\n🍽️ 디너: 인터내셔널 뷔페 포함';
        }

        if (product.options && Object.keys(selectedOptions).length > 0) {
            const selectedList = Object.entries(selectedOptions)
                .map(([idx, count]) => {
                    if (idx === '99') return null; // Skip dinner since it's handled above
                    const opt = product.options![parseInt(idx)];
                    return count > 0 ? `${opt.name} x${count}` : null;
                })
                .filter(Boolean);

            if (selectedList.length > 0) {
                optionsMsg += `\n🐯 추가옵션: ${selectedList.join(', ')}`;
            }
        }

        const message = `[푸켓 라스트데이 견적]
────────────────
📍 투어: ${tourName}
📅 일정: ${dateStr}
👥 인원: 성인${adults} / 아동${children}${carrierMsg}${optionsMsg}
────────────────
💰 총 합계: ${totalPrice} 바트
────────────────
상담원 연결을 시작합니다.`;

        navigator.clipboard.writeText(message);
        alert("견적 내용이 복사되었습니다! 상담창에 붙여넣기 해주세요.");
        window.open('http://pf.kakao.com/_rxbHRX/chat', '_blank');
    };

    return createPortal(
        <div
            className="modal-overlay"
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(5px)',
                zIndex: 2000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px'
            }}
            onClick={onClose}
        >
            <div
                className="modal-container"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    backgroundColor: '#fff',
                    borderRadius: '16px',
                    width: '100%',
                    maxWidth: '500px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    position: 'relative',
                    color: '#333'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
                >
                    <X size={24} color="#000" />
                </button>

                <div style={{ padding: '20px', width: '100%' }}>
                    {/* 상품 제목 및 가격 */}
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px', color: '#000' }}>{product.name}</h2>

                    {/* 예약 입력란 섹션: 모두 왼쪽 정렬 및 상하 배치 */}
                    <div className="booking-form" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* 1. 날짜 선택 */}
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>📅 여행 날짜</label>
                            <input
                                type="date"
                                className="full-width-input"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                            />
                        </div>

                        {/* 2. 인원 선택 */}
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>👥 인원 (성인/아동)</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    type="number"
                                    placeholder="성인"
                                    value={adultCount}
                                    onChange={(e) => setAdultCount(Math.max(0, parseInt(e.target.value) || 0))}
                                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                                />
                                <input
                                    type="number"
                                    placeholder="아동"
                                    value={childCount}
                                    onChange={(e) => setChildCount(Math.max(0, parseInt(e.target.value) || 0))}
                                    style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                                />
                            </div>
                        </div>

                        {/* 3. 코스 및 옵션 선택 (FantaSea/SiamNiramit 전용 레이아웃 분기) */}
                        {product.id === 'phuket-fantasea' ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left', marginTop: '10px' }}>
                                {/* 1. 디너 포함 여부 선택 */}
                                <div>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>🍽️ 식사 옵션 선택</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {product.courses?.map((course, idx) => (
                                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: selectedCourseIdx === idx ? '#FEE500' : '#ddd', backgroundColor: selectedCourseIdx === idx ? 'rgba(254, 229, 0, 0.05)' : '#fff' }}>
                                                <input
                                                    type="radio"
                                                    name="dinner"
                                                    checked={selectedCourseIdx === idx}
                                                    onChange={() => setSelectedCourseIdx(idx)}
                                                    style={{ width: '18px', height: '18px' }}
                                                />
                                                <span style={{ fontSize: '1rem' }}>{course.name} ({course.priceAdult})</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. 좌석 업그레이드 선택 */}
                                <div>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>💺 좌석 등급</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: !selectedOptions[0] ? '#2c3e50' : '#ddd', backgroundColor: !selectedOptions[0] ? 'rgba(44, 62, 80, 0.05)' : '#fff' }}>
                                            <input
                                                type="radio"
                                                name="seat"
                                                checked={!selectedOptions[0]}
                                                onChange={() => setSelectedOptions({})}
                                                style={{ width: '18px', height: '18px' }}
                                            />
                                            <span style={{ fontSize: '1rem' }}>일반석 (기본)</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: selectedOptions[0] ? '#D4AF37' : '#ddd', backgroundColor: selectedOptions[0] ? 'rgba(212, 175, 55, 0.05)' : '#fff' }}>
                                            <input
                                                type="radio"
                                                name="seat"
                                                checked={!!selectedOptions[0]}
                                                onChange={() => setSelectedOptions({ 0: 1 })}
                                                style={{ width: '18px', height: '18px' }}
                                            />
                                            <span style={{ fontSize: '1rem' }}>골드 시트 업그레이드 (+350바트)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : product.id === 'siam-niramit' ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left', marginTop: '10px' }}>
                                {/* 1. 좌석 등급 선택 (Siam Niramit) */}
                                <div>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>💺 좌석 등급 선택</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        {product.courses?.map((course, idx) => (
                                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: selectedCourseIdx === idx ? '#3498db' : '#ddd', backgroundColor: selectedCourseIdx === idx ? 'rgba(52, 152, 219, 0.05)' : '#fff' }}>
                                                <input
                                                    type="radio"
                                                    name="seat-grade"
                                                    checked={selectedCourseIdx === idx}
                                                    onChange={() => setSelectedCourseIdx(idx)}
                                                    style={{ width: '18px', height: '18px' }}
                                                />
                                                <span style={{ fontSize: '1rem' }}>{course.name} ({course.priceAdult})</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. 디너 추가 여부 선택 */}
                                <div>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '12px' }}>🍽️ 디너 뷔페 추가</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: !selectedOptions[99] ? '#2c3e50' : '#ddd', backgroundColor: !selectedOptions[99] ? 'rgba(44, 62, 80, 0.05)' : '#fff' }}>
                                            <input
                                                type="radio"
                                                name="dinner-opt"
                                                checked={!selectedOptions[99]}
                                                onChange={() => setSelectedOptions(prev => ({ ...prev, [99]: 0 }))}
                                                style={{ width: '18px', height: '18px' }}
                                            />
                                            <span style={{ fontSize: '1rem' }}>쇼 전용 관람 (식사 없음)</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: selectedOptions[99] ? '#e67e22' : '#ddd', backgroundColor: selectedOptions[99] ? 'rgba(230, 126, 34, 0.05)' : '#fff' }}>
                                            <input
                                                type="radio"
                                                name="dinner-opt"
                                                checked={!!selectedOptions[99]}
                                                onChange={() => setSelectedOptions(prev => ({ ...prev, [99]: 1 }))}
                                                style={{ width: '18px', height: '18px' }}
                                            />
                                            <span style={{ fontSize: '1rem' }}>쇼 + 디너 뷔페 업그레이드 (성인+350 / 아동+200)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* 기존 일반 코스 선택 UI */
                            product.courses && product.courses.length > 0 && (
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>📍 코스 선택</label>
                                    <select
                                        value={selectedCourseIdx}
                                        onChange={(e) => setSelectedCourseIdx(Number(e.target.value))}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                                    >
                                        {product.courses.map((course, idx) => (
                                            <option key={idx} value={idx}>
                                                {course.name} ({course.priceAdult})
                                            </option>
                                        ))}
                                    </select>

                                    {/* 선택된 코스의 상세 설명 및 주의사항 표시 */}
                                    {product.courses[selectedCourseIdx] && (
                                        <div style={{ marginTop: '10px', padding: '12px', backgroundColor: '#fffbe6', borderRadius: '8px', border: '1px solid #ffe58f' }}>
                                            {product.courses[selectedCourseIdx].description && (
                                                <p style={{ fontSize: '0.85rem', color: '#856404', margin: '0 0 8px 0', lineHeight: '1.4' }}>
                                                    💡 {product.courses[selectedCourseIdx].description}
                                                </p>
                                            )}
                                            {product.courses[selectedCourseIdx].caution && (
                                                <p style={{ fontSize: '0.85rem', color: '#d9534f', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>
                                                    ⚠️ 주의: {product.courses[selectedCourseIdx].caution}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'flex-start', marginTop: '10px' }}>

                            {/* 3. 호텔 정보 (픽업/드랍) */}
                            <div className="hotel-info-section" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>🏨 픽업 호텔명 (로비 상세 기재)</label>
                                    <input
                                        type="text"
                                        value={pickupHotel}
                                        onChange={(e) => setPickupHotel(e.target.value)}
                                        placeholder="예: 그랜드 머큐어 로비"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                    <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>🚗 드랍 호텔명 (공항 또는 다음 숙소)</label>
                                    <input
                                        type="text"
                                        value={dropoffHotel}
                                        onChange={(e) => setDropoffHotel(e.target.value)}
                                        placeholder="예: 푸켓 공항 2층"
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                                    />
                                </div>
                            </div>

                            {/* 4. 상품 상세 및 주의사항 섹션 */}
                            <div style={{ textAlign: 'left', width: '100%', marginTop: '20px' }}>
                                <h4 style={{ color: product.category === 'HIT' ? '#005aab' : '#2c3e50', borderLeft: `4px solid ${product.category === 'HIT' ? '#005aab' : '#FEE500'}`, paddingLeft: '10px', fontWeight: 'bold' }}>
                                    {product.category === 'HIT' ? '🎪' : '✨'} 상품 상세 설명
                                </h4>
                                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#555', backgroundColor: product.category === 'HIT' ? '#f0f4f8' : '#f9f9f9', padding: '15px', borderRadius: '8px', margin: '10px 0 20px 0' }}>
                                    {product.description}
                                </p>

                                <h4 style={{ color: product.category === 'HIT' ? '#d35400' : '#e74c3c', borderLeft: `4px solid ${product.category === 'HIT' ? '#d35400' : '#e74c3c'}`, paddingLeft: '10px', fontWeight: 'bold', marginTop: '20px' }}>⚠️ 주의 사항</h4>
                                <ul style={{ fontSize: '0.9rem', color: '#666', paddingLeft: '20px', lineHeight: '1.8', marginTop: '10px' }}>
                                    {product.category === 'HIT' ? (
                                        <>
                                            <li>아동 기준: 신장 90cm ~ 140cm (90cm 미만 무료, 좌석 없음)</li>
                                            <li>공연장 내 촬영 불가 (입구에서 휴대폰/카메라 보관 필요)</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>준비물: 수영복, 아쿠아슈즈, 비치타월, 선크림, 개인 경비(팁 등)</li>
                                            <li>바우처에 기재된 픽업 시간 10분 전 로비 대기 부탁드립니다.</li>
                                        </>
                                    )}
                                    {product.caution && <li>{product.caution}</li>}
                                </ul>
                            </div>

                            {/* 1. 수하물/캐리어 입력 (왼쪽 밀착 및 상하 배치) */}
                            {['phi-phi', 'similan', 'racha', 'bamboo', 'khai'].some(id => product.id.includes(id)) && (
                                <div className="input-group" style={{ width: '100%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <label style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '8px' }}>
                                        🧳 캐리어 보관 (개당 200바트)
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <button
                                            onClick={() => setLuggageCount(Math.max(0, luggageCount - 1))}
                                            style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.2rem', color: '#333' }}
                                        >
                                            -
                                        </button>
                                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold', minWidth: '30px', textAlign: 'center', color: '#333' }}>
                                            {luggageCount}개
                                        </span>
                                        <button
                                            onClick={() => setLuggageCount(luggageCount + 1)}
                                            style={{ width: '40px', height: '40px', borderRadius: '8px', border: '1px solid #ddd', backgroundColor: '#fff', cursor: 'pointer', fontSize: '1.2rem', color: '#333' }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* 2. 타이거 파크 및 기타 옵션 선택 */}
                            {product.options && product.options.length > 0 && (
                                <div className="options-container" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>
                                        ➕ 추가 옵션 선택
                                    </label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {product.options.map((option, idx) => (
                                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                                                <input
                                                    type="checkbox"
                                                    style={{ width: '18px', height: '18px' }}
                                                    checked={!!selectedOptions[idx]}
                                                    onChange={(e) => {
                                                        const isChecked = e.target.checked;
                                                        setSelectedOptions(prev => ({
                                                            ...prev,
                                                            [idx]: isChecked ? 1 : 0
                                                        }));
                                                    }}
                                                />
                                                <span>{option.name} (+{option.price}바트)</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* 최종 견적 및 카톡 연결 (위아래 배열) */}
                <div className="total-box" style={{ width: '100%', marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderTop: '1px solid #eee' }}>

                    {/* 금액 상세 내역 추가 */}
                    <div style={{ width: '100%', textAlign: 'left', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px dashed #ddd' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.95rem' }}>
                            <span>인원 기본 요금:</span>
                            <span>{(() => {
                                const course = product.courses?.[selectedCourseIdx];
                                if (!course) return 0;
                                const p = (s: string) => parseInt(s.replace(/[^0-9]/g, '')) || 0;
                                return (p(course.priceAdult) * adultCount + p(course.priceChild) * childCount).toLocaleString();
                            })()} THB</span>
                        </div>

                        {/* 캐리어 비용 상세 */}
                        {((product.category === 'SIMILAN' ? (luggageMedium + luggageLarge) : luggageCount) > 0) && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.95rem', color: '#e67e22' }}>
                                <span>캐리어 추가 요금 ({product.category === 'SIMILAN' ? (luggageMedium + luggageLarge) : luggageCount}개):</span>
                                <span>+{(() => {
                                    const carriers = product.category === 'SIMILAN' ? (luggageMedium + luggageLarge) : luggageCount;
                                    const pricePerBag = product.category === 'SIMILAN' ? (product.luggagePrice || 200) : (product.carrierFeePerUnit || product.luggagePrice || 200);
                                    return (carriers * pricePerBag).toLocaleString();
                                })()} THB</span>
                            </div>
                        )}

                        {/* 옵션 비용 상세 (있을 경우) */}
                        {Object.values(selectedOptions).some(v => v > 0) && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.95rem', color: '#27ae60' }}>
                                <span>추가 옵션 합계:</span>
                                <span>+{(() => {
                                    let total = 0;
                                    Object.entries(selectedOptions).forEach(([idx, count]) => {
                                        const opt = product.options?.[parseInt(idx)];
                                        if (opt) total += opt.price * count;
                                    });
                                    return total.toLocaleString();
                                })()} THB</span>
                            </div>
                        )}

                        {/* 디너 추가 요금 상세 (Siam Niramit 등) */}
                        {product.dinnerPricing && selectedOptions[99] && (
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.95rem', color: '#e67e22' }}>
                                <span>디너 뷔페 추가 요금:</span>
                                <span>+{(product.dinnerPricing.adult * adultCount + product.dinnerPricing.child * childCount).toLocaleString()} THB</span>
                            </div>
                        )}
                    </div>

                    <p style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '15px', color: '#000', textAlign: 'center' }}>
                        총 합계: <span style={{ color: '#e74c3c' }}>{totalPrice}</span> 바트
                    </p>

                    <button className="kakao-btn" onClick={handleKakaoLink} style={{ width: '100%', padding: '16px', backgroundColor: '#FEE500', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', transition: 'transform 0.1s' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        카카오톡으로 견적 상담하기
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProductModal;
