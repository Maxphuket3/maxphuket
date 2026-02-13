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
        const fallback = { total: 0, basePrice: 0, mandatoryFees: 0, pickupFee: 0, luggageTotalInfo: 0, optionsTotal: 0, dinnerTotal: 0 };
        if (!product || !product.courses) return fallback;
        const course = product.courses[selectedCourseIdx];
        if (!course) return fallback;

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

        // 3. Luggage/Carrier Logic (수정된 부분: 기본 개당 300바트)
        const pricePerBag = product.category === 'SIMILAN'
            ? (product.luggagePrice || 300)
            : (product.carrierFeePerUnit || product.luggagePrice || 300);

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
        const total = basePrice + mandatoryFees + pickupFee + luggageTotalInfo + optionsTotal + dinnerTotal;
        return {
            total,
            basePrice,
            mandatoryFees,
            pickupFee,
            luggageTotalInfo,
            optionsTotal,
            dinnerTotal
        };
    }, [product, selectedCourseIdx, adultCount, childCount, infantCount, pickupHotel, selectedPickupOptionIdx, isPaidPickup, luggageCount, luggageSmall, luggageMedium, luggageLarge, selectedOptions]);

    const calculateTotal = () => totalAmount.total.toLocaleString();

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
        if (luggageCount > 0) extraMsg += `\n캐리어 보관: ${luggageCount}개`;

        return `${baseMsg}${pickupMsg}${extraMsg}\n----------------\n예상 견적: ${total} THB`;
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
            const pricePerBag = product.category === 'SIMILAN' ? (product.luggagePrice || 300) : (product.carrierFeePerUnit || product.luggagePrice || 300);
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
                    {/* 1. 상품명 및 가격 상세 내역 (상단) */}
                    <div style={{ textAlign: 'left', borderBottom: '2px solid #FEE500', paddingBottom: '15px', width: '100%', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '8px', color: '#000' }}>{product.name}</h3>
                        <p style={{ color: '#666', fontSize: '0.95rem' }}>
                            성인 {product.courses?.[selectedCourseIdx]?.priceAdult || (product as any).priceAdult || (product as any).prices?.adult || product.price} |
                            아동 {product.courses?.[selectedCourseIdx]?.priceChild || (product as any).priceChild || (product as any).prices?.child || '별도문의'}
                        </p>
                    </div>

                    {/* 입력창 순서: 날짜 -> 인원 -> 호텔(픽업/드랍) -> 수하물 */}
                    <div className="vertical-input-group" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* 1. 날짜 선택 */}
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>📅 여행 날짜</label>
                            <input
                                type="date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                            />
                        </div>

                        {/* 2. 인원 선택 */}
                        <div className="input-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>👥 인원 선택 (성인/아동)</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#999' }}>성인</span>
                                    <input
                                        type="number"
                                        value={adultCount}
                                        onChange={(e) => setAdultCount(Math.max(0, parseInt(e.target.value) || 0))}
                                        style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                                    />
                                </div>
                                <div style={{ flex: 1, position: 'relative' }}>
                                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem', color: '#999' }}>아동</span>
                                    <input
                                        type="number"
                                        value={childCount}
                                        onChange={(e) => setChildCount(Math.max(0, parseInt(e.target.value) || 0))}
                                        style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 3. 코스 및 옵션 선택 (FantaSea/SiamNiramit 전용 레이아웃 분기) */}
                        {product.id === 'phuket-fantasea' ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>🍽️ 식사 옵션 선택</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        {product.courses?.map((course, idx) => (
                                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: selectedCourseIdx === idx ? '#FEE500' : '#ddd', backgroundColor: selectedCourseIdx === idx ? 'rgba(254, 229, 0, 0.05)' : '#fff' }}>
                                                <input type="radio" name="dinner" checked={selectedCourseIdx === idx} onChange={() => setSelectedCourseIdx(idx)} />
                                                <span>{course.name} ({course.priceAdult})</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>💺 좌석 등급</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: !selectedOptions[0] ? '#2c3e50' : '#ddd', backgroundColor: !selectedOptions[0] ? 'rgba(44, 62, 80, 0.05)' : '#fff' }}>
                                            <input type="radio" name="seat" checked={!selectedOptions[0]} onChange={() => setSelectedOptions({})} />
                                            <span>일반석 (기본)</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1px solid', borderColor: selectedOptions[0] ? '#D4AF37' : '#ddd', backgroundColor: selectedOptions[0] ? 'rgba(212, 175, 55, 0.05)' : '#fff' }}>
                                            <input type="radio" name="seat" checked={!!selectedOptions[0]} onChange={() => setSelectedOptions({ 0: 1 })} />
                                            <span>골드 시트 업그레이드 (+350바트)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : product.id === 'siam-niramit' ? (
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div className="option-item">
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>💺 좌석 등급 선택</label>
                                    <select
                                        value={selectedCourseIdx}
                                        onChange={(e) => setSelectedCourseIdx(Number(e.target.value))}
                                        style={{ width: '100%', padding: '14px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', backgroundColor: '#fff' }}
                                    >
                                        <option value={0}>실버 좌석 (기본 - 1,350 THB)</option>
                                        <option value={1}>골드 좌석 (+200바트 - 1,550 THB)</option>
                                        <option value={2}>플래티넘 좌석 (+350바트 - 1,700 THB)</option>
                                    </select>
                                </div>
                                <div className="option-item">
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>🍽️ 식사 옵션 선택</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '14px', borderRadius: '10px', border: '1px solid', borderColor: !selectedOptions[99] ? '#2c3e50' : '#eee', backgroundColor: !selectedOptions[99] ? 'rgba(44, 62, 80, 0.03)' : '#fff' }}>
                                            <input type="radio" name="dinner" checked={!selectedOptions[99]} onChange={() => setSelectedOptions(prev => ({ ...prev, [99]: 0 }))} style={{ width: '20px', height: '20px' }} />
                                            <span>쇼 전용 (디너 미포함)</span>
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '14px', borderRadius: '10px', border: '1px solid', borderColor: selectedOptions[99] ? '#e67e22' : '#eee', backgroundColor: selectedOptions[99] ? 'rgba(230, 126, 34, 0.03)' : '#fff' }}>
                                            <input type="radio" name="dinner" checked={!!selectedOptions[99]} onChange={() => setSelectedOptions(prev => ({ ...prev, [99]: 1 }))} style={{ width: '20px', height: '20px' }} />
                                            <span>쇼 + 인터내셔널 뷔페 포함 (+350 THB)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            product.courses && product.courses.length > 0 && (
                                <div className="input-group">
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>📍 코스 선택</label>
                                    <select
                                        value={selectedCourseIdx}
                                        onChange={(e) => setSelectedCourseIdx(Number(e.target.value))}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '1rem', color: '#333', background: '#fff' }}
                                    >
                                        {product.courses.map((course, idx) => (
                                            <option key={idx} value={idx}>{course.name} ({course.priceAdult})</option>
                                        ))}
                                    </select>
                                    {product.courses[selectedCourseIdx] && (
                                        <div style={{ marginTop: '10px', padding: '12px', backgroundColor: '#fffbe6', borderRadius: '8px', border: '1px solid #ffe58f' }}>
                                            {product.courses[selectedCourseIdx].description && <p style={{ fontSize: '0.85rem', color: '#856404', margin: '0 0 8px 0', lineHeight: '1.4' }}>💡 {product.courses[selectedCourseIdx].description}</p>}
                                            {product.courses[selectedCourseIdx].caution && <p style={{ fontSize: '0.85rem', color: '#d9534f', margin: 0, fontWeight: 'bold', lineHeight: '1.4' }}>⚠️ 주의: {product.courses[selectedCourseIdx].caution}</p>}
                                        </div>
                                    )}
                                </div>
                            )
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', alignItems: 'flex-start', textAlign: 'left', marginTop: '10px' }}>
                            {/* 1. 호텔 정보 입력 (모든 상품 공통) */}
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <label style={{ fontWeight: 'bold' }}>🏨 픽업 호텔명 (로비 상세 기재)</label>
                                <input
                                    type="text"
                                    value={pickupHotel}
                                    onChange={(e) => setPickupHotel(e.target.value)}
                                    placeholder="예: 그랜드 머큐어 파통 로비"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', color: '#333', background: '#fff' }}
                                />

                                <label style={{ fontWeight: 'bold', marginTop: '10px' }}>🚗 드랍 호텔명 (공항 또는 차기 숙소)</label>
                                <input
                                    type="text"
                                    value={dropoffHotel}
                                    onChange={(e) => setDropoffHotel(e.target.value)}
                                    placeholder="예: 푸켓 국제공항"
                                    style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', color: '#333', background: '#fff' }}
                                />
                            </div>

                            {/* 2. 상품별 맞춤형 주의사항 */}
                            <div style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#fff9e6', borderRadius: '10px' }}>
                                <h4 style={{ margin: '0 0 10px 0', color: '#e67e22' }}>⚠️ 필독 주의사항</h4>
                                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#555', whiteSpace: 'pre-wrap' }}>
                                    {['phuket-fantasea', 'siam-niramit'].includes(product.id)
                                        ? "• 공연장 내 촬영 절대 금지 (입구 보관)\n• 에어컨이 강하니 얇은 겉옷 준비\n• 아동 기준: 신장 101~140cm (100cm 이하 무료)"
                                        : "• 임산부 및 노약자 탑승 제한\n• 준비물: 수영복, 수건, 선크림\n• 아동 기준: 만 4세~11세 미만"
                                    }
                                    {product.caution && `\n• ${product.caution}`}
                                </p>
                            </div>

                            {/* 3. 수하물/캐리어 (데이터 기준 300바트 적용) */}
                            {['phi-phi', 'similan', 'racha', 'bamboo', 'khai'].some(id => product.id.includes(id)) && (
                                <div style={{ width: '100%', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                                    <label style={{ fontWeight: 'bold' }}>🧳 캐리어 보관 수량 (개당 300바트)</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '10px' }}>
                                        <button onClick={decreaseCarrier} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>-</button>
                                        <span style={{ fontWeight: 'bold', fontSize: '1.2rem', minWidth: '30px', textAlign: 'center' }}>{luggageCount}개</span>
                                        <button onClick={increaseCarrier} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>+</button>
                                    </div>
                                </div>
                            )}

                            {/* 4. 기타 옵션 (있을 경우 표시) */}
                            {product.options && product.options.length > 0 && product.id !== 'phuket-fantasea' && product.id !== 'siam-niramit' && (
                                <div style={{ width: '100%', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                                    <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>➕ 추가 옵션 선택</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {product.options.map((option, idx) => (
                                            <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.95rem' }}>
                                                <input type="checkbox" checked={!!selectedOptions[idx]} onChange={(e) => setSelectedOptions(prev => ({ ...prev, [idx]: e.target.checked ? 1 : 0 }))} />
                                                <span>{option.name} (+{option.price}바트)</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* 5. 최종 합계 (블랙 박스 강조) */}
                            <div style={{ width: '100%', padding: '20px', background: '#333', color: '#fff', borderRadius: '12px', marginTop: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                                    <span>최종 예약 금액</span>
                                    <span style={{ color: '#FEE500' }}>{totalAmount.total.toLocaleString()} THB</span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '8px', textAlign: 'right' }}>
                                    (성인 {adultCount}, 아동 {childCount}인 기준)
                                </div>
                            </div>

                            <button className="kakao-btn" onClick={handleKakaoLink} style={{ width: '100%', padding: '18px', backgroundColor: '#FEE500', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', marginTop: '5px' }}>
                                카카오톡으로 견적 상담하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ProductModal;
