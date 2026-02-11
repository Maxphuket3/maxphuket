import React, { useState } from 'react';
import { User } from '../types';
import ProductCarousel from '../components/ProductCarousel';
import ProductModal from '../components/ProductModal';
import { Product, MAIN_PRODUCTS } from '../data/products';
import { Sparkles, MessageCircle } from 'lucide-react';

const MainScreen: React.FC<{ onNext: (user: User) => void }> = ({ onNext }) => {
  const [formData, setFormData] = useState({
    name: '',
    party: 2,
    hotel: '',
    flightNo: '',
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="main-container" style={{
      overflowY: 'auto',
      height: '100vh',
      background: '#050505', // 더 짙은 다크 배경
      scrollBehavior: 'smooth',
      display: 'block', // Flex 정렬 해제하여 스크롤 흐름 순서대로 배치
      padding: '0'
    }}>
      {/* Premium Video Background with Overlay */}
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-bg"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-beach-resort-and-the-ocean-1563-large.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent, #050505)'
        }}></div>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 20px 100px 20px',
        width: '100%'
      }}>

        {/* 1. Brand Logo & Title Area */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            background: 'rgba(212, 175, 55, 0.1)',
            padding: '8px 20px',
            borderRadius: '100px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: '20px'
          }}>
            <Sparkles size={16} color="#D4AF37" />
            <span style={{ color: '#D4AF37', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '1px' }}>PREMIUM PHUKET TRAVEL</span>
          </div>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '10px',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            LASTDAY <span style={{ color: '#D4AF37' }}>PLANNER</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '600px' }}>
            가장 완벽한 푸켓 여행의 마지막 날을 경험하세요. <br />
            AI가 설계하는 맞춤형 프리미엄 일정이 곧 시작됩니다.
          </p>
        </div>

        {/* 2. Form Section */}
        <div className="glass-card" style={{
          marginBottom: '100px',
          background: 'rgba(15, 15, 15, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '550px'
        }}>
          <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '30px', textAlign: 'center' }}>여행 정보 입력</h2>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>성함 (Full Name)</label>
              <input
                type="text"
                name="name"
                placeholder="홍길동"
                value={formData.name}
                onChange={handleChange}
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>인원 (Party Size)</label>
              <input
                type="number"
                name="party"
                min="1"
                value={formData.party}
                onChange={handleChange}
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>항공편명 (Flight No.)</label>
              <input
                type="text"
                name="flightNo"
                placeholder="예: KE638"
                value={formData.flightNo}
                onChange={handleChange}
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <div className="form-group" style={{ gridColumn: 'span 2' }}>
              <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '8px', display: 'block' }}>체크아웃 호텔 (Checkout Hotel)</label>
              <input
                type="text"
                name="hotel"
                placeholder="예: 힐튼 푸켓 아카디아"
                value={formData.hotel}
                onChange={handleChange}
                style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)' }}
              />
            </div>

            <button
              className="btn-gold-glossy"
              type="button"
              style={{
                gridColumn: 'span 2',
                marginTop: '30px',
                padding: '22px',
                background: 'linear-gradient(135deg, #D4AF37 0%, #F1D382 50%, #D4AF37 100%)',
                color: '#000',
                fontSize: '1.2rem',
                fontWeight: 900,
                borderRadius: '100px',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(212, 175, 55, 0.4)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                if (!formData.name || !formData.hotel) {
                  alert('성함과 호텔 정보를 입력해주세요.');
                  return;
                }
                onNext({
                  name: formData.name,
                  party: formData.party,
                  hotel: formData.hotel,
                  flight_no: formData.flightNo,
                  flight_time: new Date(),
                });
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(212, 175, 55, 0.6)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(212, 175, 55, 0.4)';
              }}
            >
              PLAN MY PERFECT DAY
              {/* Glossy shine overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '50%',
                height: '100%',
                background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-25deg)',
                animation: 'shine 3s infinite'
              }}></div>
            </button>

            <style>{`
              @keyframes shine {
                0% { left: -100%; }
                20% { left: 150%; }
                100% { left: 150%; }
              }
            `}</style>
          </form>
        </div>

        {/* 3. Products Area */}
        <div style={{ width: '100%', maxWidth: '1300px', display: 'flex', flexDirection: 'column', gap: '80px' }}>

          {/* Similan Special Section */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                color: '#fff',
                marginBottom: '10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '0 20px'
              }}>
                시밀란 섬 투어 스페셜
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', padding: '0 20px', fontSize: 'clamp(0.85rem, 3vw, 1rem)' }}>1년에 단 6개월만 열리는 환상의 섬, 시밀란의 베스트 투어를 비교해보세요.</p>
            </div>
            <ProductCarousel
              title="🌊 시밀란 투어 비교 예약 🌊"
              products={MAIN_PRODUCTS.filter(p => p.category === 'SIMILAN')}
              onProductClick={(product) => setSelectedProduct(product)}
            />
          </div>

          {/* General Best Products */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{
                fontSize: 'clamp(1.5rem, 5vw, 2.2rem)',
                color: '#fff',
                marginBottom: '10px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                padding: '0 20px'
              }}>
                푸켓 베스트 주력 상품
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', padding: '0 20px', fontSize: 'clamp(0.85rem, 3vw, 1rem)' }}>라스트테이가 엄선한 푸켓 최고의 투어들을 만나보세요.</p>
            </div>
            <ProductCarousel
              products={MAIN_PRODUCTS.filter(p => p.category !== 'SIMILAN')}
              onProductClick={(product) => setSelectedProduct(product)}
            />
          </div>

        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Floating Action Button - KakaoTalk */}
      <a
        href="http://pf.kakao.com/_rxbHRX"
        target="_blank"
        rel="noreferrer"
        className="kakao-float-button"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          background: '#FEE500',
          color: '#000',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'transform 0.2s',
          cursor: 'pointer',
          textDecoration: 'none'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={32} fill="#000" />
      </a>
    </div>
  );
};

export default MainScreen;
