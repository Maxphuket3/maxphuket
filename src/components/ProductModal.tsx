import React, { useState, useEffect } from 'react';

interface ProductModalProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [carriers, setCarriers] = useState(0);

  useEffect(() => {
    if (product) {
      setTotalPrice(product.price || 0);
      setSelectedOptions([]);
      setCarriers(0);
    }
  }, [product, isOpen]);

  const handleOptionToggle = (optionId: string, optionPrice: number) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      setTotalPrice(prev => prev - optionPrice);
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
      setTotalPrice(prev => prev + optionPrice);
    }
  };

  if (!isOpen || !product) return null;

  // 캐리어 비용 설정 (직접 방문지는 0으로 처리)
  const isDirect = product.id === 'tiger-park' || product.id === 'lion-land';
  const feePerCarrier = product.id === 'siam-niramit' ? 100 : 300;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' }}>
      <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '20px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>✕</button>

        <img src={product.image} alt={product.title} style={{ width: '100%', borderRadius: '15px', marginBottom: '20px' }} />
        <h2 style={{ marginBottom: '10px' }}>{product.title}</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>{product.description}</p>

        {/* 직접 방문 투어가 아닐 때만 캐리어 조절창 노출 */}
        {!isDirect && (
          <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>🧳 캐리어 보관 신청 (개당 {feePerCarrier} THB)</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => setCarriers(Math.max(0, carriers - 1))} style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#fff' }}>-</button>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{carriers}개</span>
              <button onClick={() => setCarriers(carriers + 1)} style={{ width: '35px', height: '35px', borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer', backgroundColor: '#fff' }}>+</button>
            </div>
          </div>
        )}

        {product.options && product.options.length > 0 && (
          <div style={{ width: '100%', marginTop: '20px' }}>
            <label style={{ fontWeight: 'bold' }}>🐯 추가 선택 옵션</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {product.options.map((option: any) => (
                <label key={option.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '10px', border: '1px solid #eee', borderRadius: '8px' }}>
                  <input type="checkbox" onChange={() => handleOptionToggle(option.id, option.price)} />
                  <span>{option.name} ({option.price.toLocaleString()} THB)</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div style={{ width: '100%', padding: '20px', background: '#333', color: '#fff', borderRadius: '12px', marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
            <span>최종 예약 금액</span>
            <span style={{ color: '#FEE500' }}>
              {(totalPrice + (carriers * (isDirect ? 0 : feePerCarrier))).toLocaleString()} THB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;