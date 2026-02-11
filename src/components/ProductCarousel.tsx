import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MAIN_PRODUCTS, Product } from '../data/products';

interface ProductCarouselProps {
    onProductClick: (product: Product) => void;
    products?: Product[];
    title?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ onProductClick, products, title }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const autoPlayTimeoutRef = useRef<number | null>(null);

    const displayProducts = products || MAIN_PRODUCTS;
    // 무한 루프를 위해 상품 배열을 3번 복제
    const infiniteProducts = [...displayProducts, ...displayProducts, ...displayProducts];

    // 자동 슬라이드
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused && scrollRef.current) {
                const cardWidth = 320 + 20; // 카드 너비 + 간격
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

                // 무한 루프: 끝에 도달하면 중간 섹션으로 순간 이동
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    const middleSection = (displayProducts.length * cardWidth);
                    scrollRef.current.scrollTo({ left: middleSection, behavior: 'auto' });
                    setTimeout(() => {
                        if (scrollRef.current) {
                            scrollRef.current.scrollTo({ left: scrollRef.current.scrollLeft + cardWidth, behavior: 'smooth' });
                        }
                    }, 50);
                } else if (scrollLeft <= 10) {
                    // 처음에 도달하면 중간 섹션으로 순간 이동
                    const middleSection = (displayProducts.length * cardWidth);
                    scrollRef.current.scrollTo({ left: middleSection, behavior: 'auto' });
                } else {
                    scrollRef.current.scrollTo({ left: scrollLeft + cardWidth, behavior: 'smooth' });
                }
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, displayProducts.length]);

    // 초기 위치를 중간 섹션으로 설정
    useEffect(() => {
        if (scrollRef.current) {
            const cardWidth = 320 + 20;
            const middleSection = (displayProducts.length * cardWidth);
            scrollRef.current.scrollTo({ left: middleSection, behavior: 'auto' });
        }
    }, [displayProducts.length]);

    // 화살표 클릭 시 일시 정지 후 재개
    const pauseAutoPlay = () => {
        setIsPaused(true);
        if (autoPlayTimeoutRef.current) {
            clearTimeout(autoPlayTimeoutRef.current);
        }
        autoPlayTimeoutRef.current = setTimeout(() => {
            setIsPaused(false);
        }, 3000);
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const cardWidth = 320 + 20;
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'left' ? scrollLeft - cardWidth : scrollLeft + cardWidth;

            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
            pauseAutoPlay();

            // 무한 루프 처리
            setTimeout(() => {
                if (scrollRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                    const middleSection = (displayProducts.length * cardWidth);

                    if (scrollLeft + clientWidth >= scrollWidth - 10) {
                        scrollRef.current.scrollTo({ left: middleSection, behavior: 'auto' });
                    } else if (scrollLeft <= 10) {
                        scrollRef.current.scrollTo({ left: middleSection, behavior: 'auto' });
                    }
                }
            }, 500);
        }
    };

    // 터치 이벤트 핸들러
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
        setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // 왼쪽으로 스와이프 (다음 카드)
            scroll('right');
        }

        if (touchStart - touchEnd < -75) {
            // 오른쪽으로 스와이프 (이전 카드)
            scroll('left');
        }

        pauseAutoPlay();
    };

    return (
        <div
            style={{ marginTop: '50px', position: 'relative' }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                @media (max-width: 768px) {
                    .carousel-nav-btn {
                        display: none !important;
                    }
                    .product-card {
                        width: 88vw !important;
                        min-width: 88vw !important;
                        max-width: 90vw !important;
                    }
                }
                .product-card {
                    width: 320px;
                    min-width: 320px;
                }
            `}</style>
            <div style={{ textAlign: 'center', marginBottom: '30px', padding: '0 10px' }}>
                <h3 style={{
                    color: '#D4AF37',
                    fontSize: 'clamp(1.1rem, 4vw, 2.2rem)',
                    fontWeight: '900',
                    margin: 0,
                    display: 'inline-block',
                    textShadow: '0 2px 15px rgba(212, 175, 55, 0.5)',
                    fontFamily: "'Montserrat', sans-serif",
                    letterSpacing: '-0.5px',
                    whiteSpace: 'nowrap',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    lineHeight: 1.2
                }}>
                    {title || '⭐ 푸켓 히트상품 ⭐'}
                </h3>
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <button
                    className="carousel-nav-btn"
                    onClick={() => scroll('left')}
                    style={{
                        position: 'absolute',
                        left: '-20px',
                        zIndex: 20,
                        background: '#D4AF37',
                        border: '2px solid #FFFFFF',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                    }}
                >
                    <ChevronLeft size={28} strokeWidth={3} />
                </button>

                <div
                    ref={scrollRef}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        display: 'flex',
                        gap: '20px',
                        overflowX: 'auto',
                        scrollBehavior: 'smooth',
                        padding: '10px 10px 30px 10px', // Added horizontal padding for mobile scroll
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                        touchAction: 'pan-x',
                        scrollSnapType: 'x mandatory' // Enable scroll snapping
                    }}
                    className="hide-scrollbar"
                >
                    {/* Style block moved to top */}

                    {infiniteProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            onClick={() => onProductClick(product)}
                            style={{
                                height: '220px',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.1)',
                                position: 'relative',
                                borderRadius: '24px',
                                background: '#0a0a0a',
                                flexShrink: 0,
                                scrollSnapAlign: 'center' // Snap each card to center
                            }}
                            className="product-premium-card product-card"
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = 'translateY(-10px)';
                                e.currentTarget.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.15)';
                                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                            }}
                        >
                            <img
                                src={product.thumbnail || product.detailImage || 'https://images.unsplash.com/photo-1589394815804-c10427c3e34b'}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.6s'
                                }}
                            />

                            {/* Badges */}
                            {product.badges && product.badges.length > 0 ? (
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '4px',
                                    zIndex: 10
                                }}>
                                    {product.badges.map((badge, idx) => (
                                        <div key={idx} style={{
                                            background: 'linear-gradient(135deg, #D4AF37 0%, #FDC700 100%)',
                                            color: '#000',
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            fontWeight: '800',
                                            fontSize: '0.65rem',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                            textAlign: 'center'
                                        }}>
                                            {badge}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    position: 'absolute',
                                    top: '15px',
                                    right: '15px',
                                    background: 'linear-gradient(135deg, #D4AF37 0%, #FDC700 100%)',
                                    color: '#000',
                                    padding: '5px 12px',
                                    borderRadius: '6px',
                                    fontWeight: '900',
                                    fontSize: '0.75rem',
                                    zIndex: 10,
                                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                                }}>
                                    BEST
                                </div>
                            )}

                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.3) 100%)',
                                zIndex: 1
                            }}></div>

                            <div style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                padding: '20px',
                                zIndex: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px'
                            }}>
                                <h4 style={{
                                    color: '#fff',
                                    fontSize: 'clamp(1.2rem, 4vw, 1.4rem)',
                                    fontWeight: '800',
                                    marginBottom: '4px',
                                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {product.name}
                                </h4>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p style={{
                                            color: '#D4AF37',
                                            fontWeight: '900',
                                            fontSize: 'clamp(1.4rem, 5vw, 1.8rem)',
                                            margin: 0,
                                            lineHeight: 1
                                        }}>
                                            {product.price}
                                        </p>
                                    </div>

                                    <span style={{
                                        fontSize: '0.7rem',
                                        color: '#000',
                                        background: '#D4AF37',
                                        padding: '6px 12px',
                                        borderRadius: '100px',
                                        fontWeight: '800'
                                    }}>
                                        RESERVE
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="carousel-nav-btn"
                    onClick={() => scroll('right')}
                    style={{
                        position: 'absolute',
                        right: '-20px',
                        zIndex: 20,
                        background: '#D4AF37',
                        border: '2px solid #FFFFFF',
                        borderRadius: '50%',
                        width: '48px',
                        height: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#000',
                        cursor: 'pointer',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(212, 175, 55, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                    }}
                >
                    <ChevronRight size={28} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
};

export default ProductCarousel;
