import React from 'react';
import { Spot } from '../types';
import { ArrowLeft, MapPin, Clock, Tag, ShoppingCart } from 'lucide-react';

const DetailScreen: React.FC<{ spot: Spot; onBack: () => void }> = ({ spot, onBack }) => {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', position: 'relative' }}>
      {/* Magazine Style Hero */}
      <div style={{ height: '60vh', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={spot.images[0]} 
          alt={spot.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to bottom, transparent, #0a0a0a)' 
        }}></div>
        
        <button 
          onClick={onBack}
          style={{ 
            position: 'absolute', 
            top: '40px', 
            left: '30px', 
            background: 'rgba(255,255,255,0.1)', 
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div style={{ padding: '0 40px', marginTop: '-100px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ 
            background: '#D4AF37', 
            color: '#000', 
            padding: '4px 12px', 
            borderRadius: '20px', 
            fontSize: '0.8rem', 
            fontWeight: 800 
          }}>
            {spot.category}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{spot.area}</span>
        </div>

        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1 }}>
          {spot.name}
        </h1>

        <div style={{ display: 'flex', gap: '40px', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={20} color="#D4AF37" />
            <span style={{ fontSize: '1.1rem' }}>{spot.duration} Minutes</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Tag size={20} color="#D4AF37" />
            <span style={{ fontSize: '1.1rem' }}>{spot.price.toLocaleString()} THB</span>
          </div>
        </div>

        <p style={{ 
          fontSize: '1.2rem', 
          lineHeight: 1.8, 
          color: 'rgba(255,255,255,0.7)', 
          maxWidth: '800px',
          marginBottom: '60px'
        }}>
          Experience the pinnacle of luxury in Phuket. This curated destination offers 
          unparalleled accessibility and premium services, ensuring your travel final 
          day is nothing short of extraordinary.
        </p>

        {spot.voucher && (
          <div className="glass-card" style={{ padding: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '100px' }}>
            <div>
              <h4 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Premium Voucher Available</h4>
              <p style={{ color: 'rgba(255,255,255,0.5)' }}>Book now and get 5% combined discount</p>
            </div>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 40px' }}>
              <ShoppingCart size={20} /> Buy Voucher
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailScreen;
