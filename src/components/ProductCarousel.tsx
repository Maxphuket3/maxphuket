import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { MAIN_PRODUCTS, Product } from '../data/products';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

interface ProductCarouselProps {
    onProductClick: (product: Product) => void;
    products?: Product[];
    title?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ onProductClick, products, title }) => {
    const [displayProducts, setDisplayProducts] = useState<Product[]>([]);

    useEffect(() => {
        const data = products || MAIN_PRODUCTS;
        if (data && data.length > 0) {
            setDisplayProducts(data);
        }
    }, [products]);

    if (displayProducts.length === 0) return null;

    return (
        <div style={{ marginTop: '50px', position: 'relative' }}>
            <style>{`
                .swiper-button-prev, .swiper-button-next {
                    color: #000;
                    background: #D4AF37;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    border: 2px solid #fff;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                }
                .swiper-button-prev:after, .swiper-button-next:after {
                    font-size: 20px;
                    font-weight: bold;
                }
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                @media (max-width: 768px) {
                    .swiper-button-prev, .swiper-button-next {
                        display: none;
                    }
                }
                /* Custom styles for slides are handled in index.css for mobile match */
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

            <div className="hit-products-section hit-product-slider" style={{ position: 'relative' }}>
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    loop={true}
                    grabCursor={true}
                    navigation={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    className="mySwiper"
                    style={{ padding: '10px 0 40px 0' }}
                >
                    {displayProducts.map((product, index) => (
                        <SwiperSlide key={`${product.id}-${index}`} className="product-card hit-product-card">
                            <div
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
                                    width: '100%',
                                    height: '100%'
                                }}
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
                                    <h4 className="product-name" style={{
                                        color: '#fff',
                                        // fontSize removed to let CSS control it
                                        fontWeight: '800',
                                        marginBottom: '4px',
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                                        // whiteSpace, overflow, textOverflow removed for multi-line support
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
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductCarousel;
