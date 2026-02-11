import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductModal from '../components/ProductModal';
import { MAIN_PRODUCTS } from '../data/products';

const TourDetailScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const product = MAIN_PRODUCTS.find(p => p.id === id) || null;

    useEffect(() => {
        if (!product) {
            // Option: Redirect to home or show alert
            alert("상품 정보를 찾을 수 없습니다.");
            navigate('/');
        }
    }, [product, navigate]);

    if (!product) return null;

    return (
        <div style={{ minHeight: '100vh', background: '#1a202c' }}>
            <ProductModal
                product={product}
                onClose={() => navigate(-1)}
            />
        </div>
    );
};

export default TourDetailScreen;
