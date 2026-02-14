import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../data/products';

interface ProductModalProps {
  product: Product | any;
  isOpen?: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen = true, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [carriers, setCarriers] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedOptions([]);
      setCarriers(0);
    }
  }, [product?.id]);

  if (!isOpen || !product) return null;

  // 1. 캐리어 비용 로직 확정 (안티 그래피티 세팅)
  const isExcludedTour =
    product.id?.toLowerCase().includes('tiger') ||
    product.id?.toLowerCase().includes('lion') ||
    product.name?.includes('타이거') ||
    product.name?.includes('라이언');

  const feePerCarrier = useMemo(() => {
    if (product.id === 'siam-niramit') return 100;
    if (isExcludedTour) return 0;
    // 명시적으로 일반 투어는 300 THB 적용
    return 300;
  }, [product.id, isExcludedTour]);

  // 2. 실시간 합계 금액 계산
  const currentTotalPrice = useMemo(() => {
    const basePrice = typeof product.price === 'string'
      ? parseInt(product.price.replace(/[^0-9]/g, '')) || 0
      : product.price || 0;

    const optionsPrice = (product.options || [])
      .filter((opt: any) => selectedOptions.includes(opt.id || opt.name))
      .reduce((sum: number, opt: any) => sum + (opt.price || 0), 0);

    const carrierPrice = isExcludedTour ? 0 : carriers * feePerCarrier;

    return basePrice + optionsPrice + carrierPrice;
  }, [product.price, product.options, selectedOptions, carriers, isExcludedTour, feePerCarrier]);

  const handleOptionToggle = (option: any) => {
    const optionId = option.id || option.name;
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      if (product.maxOptionSelection && selectedOptions.length >= product.maxOptionSelection) {
        alert(`최대 ${product.maxOptionSelection}개까지 선택 가능합니다.`);
        return;
      }
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px', backdropFilter: 'blur(5px)' }}>
      <div style={{ backgroundColor: '#fff', padding: '0', borderRadius: '32px', width: '100%', maxWidth: '520px', maxHeight: '92vh', overflowY: 'auto', position: 'relative', boxShadow: '0 30px 100px rgba(0,0,0,0.5)' }}>

        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'rgba(255,255,255,0.9)', width: '40px', height: '40px', borderRadius: '50%', fontSize: '24px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>✕</button>

        <img src={product.detailImage || product.thumbnail || product.image} alt={product.name} style={{ width: '100%', height: '280px', objectFit: 'cover' }} />

        <div style={{ padding: '30px' }}>
          {/* 상품 헤더 */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '12px', color: '#111', lineHeight: '1.2' }}>{product.name}</h2>
            <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>{product.description}</p>
          </div>

          {/* 1. 상세 정보 섹션 (details 우선 노출) */}
          <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* 상품 상세 내용 (details) */}
            {product.details && (
              <div style={{ backgroundColor: '#F0F7FF', padding: '20px', borderRadius: '20px', border: '1px solid #E0EEFF' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#0056b3' }}>📋 상세 상품 안내</h4>
                <div style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>{product.details}</div>
              </div>
            )}

            {/* 하이라이트 (details가 없을 때 서브로 노출) */}
            {!product.details && product.highlights && product.highlights.length > 0 && (
              <div style={{ backgroundColor: '#F0F7FF', padding: '20px', borderRadius: '20px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', color: '#0056b3' }}>✨ 투어 포인트</h4>
                <ul style={{ paddingLeft: '20px', margin: 0, color: '#334155', fontSize: '0.95rem', lineHeight: '1.7' }}>
                  {product.highlights.map((h: string, i: number) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            )}

            {/* 포함/불포함 사항 */}
            {(product.inclusions || product.exclusions) && (
              <div style={{ backgroundColor: '#fdfdfd', border: '1px solid #eee', padding: '20px', borderRadius: '20px' }}>
                {product.inclusions && (
                  <div style={{ marginBottom: product.exclusions ? '15px' : '0' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#2d6a4f' }}>✅ 포함 사항</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: '1.6' }}>
                      {Array.isArray(product.inclusions) ? product.inclusions.join(', ') : product.inclusions}
                    </p>
                  </div>
                )}
                {product.exclusions && (
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#c1121f' }}>❌ 불포함 사항</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', lineHeight: '1.6' }}>
                      {Array.isArray(product.exclusions) ? product.exclusions.join(', ') : product.exclusions}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 차량 및 픽업 안내 */}
            {product.vehicleInfo && (
              <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '20px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#333' }}>🚐 차량 & 픽업 안내</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#555', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{product.vehicleInfo}</p>
              </div>
            )}
          </div>

          {/* 2. 캐리어 보관 신청 */}
          {!isExcludedTour && (
            <div style={{ marginBottom: '30px', padding: '24px', backgroundColor: '#fff', border: '2px solid #D4AF37', borderRadius: '24px', boxShadow: '0 10px 20px rgba(212, 175, 55, 0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <label style={{ fontWeight: '900', fontSize: '1.1rem', color: '#000' }}>🧳 캐리어 보관 신청</label>
                <span style={{ color: '#D4AF37', fontWeight: 'bold' }}>개당 {feePerCarrier} THB</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <button
                  onClick={() => setCarriers(Math.max(0, carriers - 1))}
                  style={{ width: '45px', height: '45px', borderRadius: '15px', border: '1px solid #ddd', cursor: 'pointer', backgroundColor: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}
                >-</button>
                <span style={{ fontSize: '1.5rem', fontWeight: '900', minWidth: '40px', textAlign: 'center' }}>{carriers}</span>
                <button
                  onClick={() => setCarriers(carriers + 1)}
                  style={{ width: '45px', height: '45px', borderRadius: '15px', border: '1px solid #ddd', cursor: 'pointer', backgroundColor: '#fff', fontSize: '1.4rem', fontWeight: 'bold' }}
                >+</button>
              </div>
              {carriers > 0 && (
                <div style={{ marginTop: '12px', fontSize: '0.9rem', color: '#D4AF37', textAlign: 'right', fontWeight: 'bold' }}>
                  + {(carriers * feePerCarrier).toLocaleString()} THB 합산됨
                </div>
              )}
            </div>
          )}

          {/* 3. 주의사항 및 취소 규정 (notices 우선 노출) */}
          <div style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {product.notices && (
              <div style={{ backgroundColor: '#FFF5F5', padding: '20px', borderRadius: '20px', border: '1px solid #FFDCDC' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#E53E3E' }}>⚠️ 필수 안내 사항</h4>
                <div style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{product.notices}</div>
              </div>
            )}

            {!product.notices && (product.caution || product.importantNotes) && (
              <div style={{ backgroundColor: '#FFF5F5', padding: '20px', borderRadius: '20px', border: '1px solid #FFDCDC' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#E53E3E' }}>⚠️ 주의사항</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#555', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                  {product.caution || (product.importantNotes && product.importantNotes.join('\n'))}
                </p>
              </div>
            )}

            {product.cancellationPolicy && (
              <div style={{ backgroundColor: '#F9FAFB', padding: '20px', borderRadius: '20px' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', color: '#666' }}>📅 취소 규정</h4>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#777', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>{product.cancellationPolicy}</p>
              </div>
            )}
          </div>

          {/* 옵션 선택 */}
          {product.options && product.options.length > 0 && (
            <div style={{ width: '100%', marginBottom: '30px' }}>
              <label style={{ fontWeight: '900', fontSize: '1.2rem', display: 'block', marginBottom: '18px' }}>🐯 선택 옵션</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {product.options.map((option: any, idx: number) => {
                  const isSelected = selectedOptions.includes(option.id || option.name);
                  return (
                    <label key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer', padding: '18px', border: isSelected ? '2px solid #D4AF37' : '1px solid #f0f0f0', borderRadius: '18px', backgroundColor: isSelected ? '#FFFCF0' : '#fff', transition: 'all 0.2s' }}>
                      <input type="checkbox" checked={isSelected} style={{ width: '22px', height: '22px', accentColor: '#D4AF37' }} onChange={() => handleOptionToggle(option)} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '800', fontSize: '1rem' }}>{option.name}</div>
                        {option.price > 0 && <div style={{ color: '#D4AF37', fontSize: '0.9rem', marginTop: '4px' }}>+ {option.price.toLocaleString()} THB</div>}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* 최종 결과 및 예약 */}
          <div style={{ position: 'sticky', bottom: '-30px', margin: '0 -30px -30px -30px', padding: '30px', background: '#fff', borderTop: '1px solid #eee', boxShadow: '0 -10px 30px rgba(0,0,0,0.05)', borderRadius: '0 0 32px 32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#666' }}>최종 예약 합계</span>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#D4AF37', fontSize: '2.2rem', fontWeight: '950' }}>{currentTotalPrice.toLocaleString()}</span>
                <span style={{ fontSize: '1.2rem', fontWeight: '800', marginLeft: '5px', color: '#D4AF37' }}>THB</span>
              </div>
            </div>
            <button
              onClick={() => {
                const message = `[예약 문의]\n상품: ${product.name}\n금액: ${currentTotalPrice.toLocaleString()} THB\n캐리어: ${carriers}개\n선택옵션: ${selectedOptions.join(', ') || '없음'}`;
                window.open(`https://pf.kakao.com/_rxbHRX`, '_blank');
              }}
              style={{ width: '100%', padding: '22px', background: 'linear-gradient(135deg, #FEE500 0%, #F5D100 100%)', border: 'none', borderRadius: '20px', fontWeight: '950', color: '#3c1e1e', cursor: 'pointer', fontSize: '1.3rem', boxShadow: '0 8px 15px rgba(254, 229, 0, 0.4)' }}
            >
              🟡 카카오톡으로 예약 확정하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
