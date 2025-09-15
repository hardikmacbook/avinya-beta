'use client';
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Title from "../SectionTitles/Title";

const ProductCarousel = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);
  const intervalRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    fetch("https://dummyjson.com/products?limit=100")
      .then(response => response.json())
      .then(data => {
        setData(data.products.slice(0, 12)); // Get 12 products for carousel
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(true);
        setLoading(false);
      });
  }, []);

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4);
      else if (window.innerWidth >= 768) setItemsPerView(3);
      else if (window.innerWidth >= 640) setItemsPerView(2);
      else setItemsPerView(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && data.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => {
          const maxSlide = Math.max(0, data.length - itemsPerView);
          return prev >= maxSlide ? 0 : prev + 1;
        });
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, data.length, itemsPerView]);

  const createSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const nextSlide = () => {
    const maxSlide = Math.max(0, data.length - itemsPerView);
    setCurrentSlide(prev => prev >= maxSlide ? 0 : prev + 1);
  };

  const prevSlide = () => {
    const maxSlide = Math.max(0, data.length - itemsPerView);
    setCurrentSlide(prev => prev <= 0 ? maxSlide : prev - 1);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#8b2727] border-t-transparent mb-4"></div>
          <div className="text-lg text-gray-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-[#8b2727]">Working on products...</div>
      </div>
    );
  }

  const maxSlides = Math.max(0, data.length - itemsPerView);
  const totalDots = maxSlides + 1;

  return (
    <div className="outer pt-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-[1200px] w-full px-4 py-6">
        <div className="product-inner">
          <div className="product-inner-content">
            <Title
              title="Our Products"
              subtitle="Trusted by industries across Vapi and Silvassa for quality electrical products and exceptional service"
            />
            
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-3xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-2xl p-6">
                <div
                  ref={carouselRef}
                  className="flex transition-transform duration-700 ease-out"
                  style={{
                    transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
                  }}
                >
                  {data.map((product) => (
                    <div
                      key={product.id}
                      className="flex-shrink-0 px-3"
                      style={{ width: `${100 / itemsPerView}%` }}
                    >
                      <div className="bg-white rounded-2xl shadow-lg border border-[#d2af6f]/20 hover:border-[#8b2727] transition-all duration-300 p-6 h-full flex flex-col hover:shadow-2xl transform">
                        <div className="w-full h-48 mb-4 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl flex items-center justify-center overflow-hidden cursor-pointer">
                          <Link
                    href={`/products/${createSlug(product.title)}`}
                    className="w-full h-48 mb-4 bg-gradient-to-br from-[#f8f3e9] to-[#f0e6d2] rounded-xl flex items-center justify-center overflow-hidden"
                  >
                    <img
                      className="max-w-full max-h-full object-contain"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  </Link>
                        </div>

                        <div className="flex flex-col flex-grow">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                              {product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}
                            </h3>
                            <div className="flex items-center bg-[#f8f3e9] px-2 py-1 rounded-full">
                              <span className="text-[#d2af6f]">★</span>
                              <span className="text-sm text-gray-700 ml-1 font-medium">{product.rating}</span>
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.description.length > 80 ? product.description.slice(0, 80) + "..." : product.description}
                          </p>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs text-[#8b2727] bg-[#f8f3e9] px-3 py-1 rounded-full font-medium">
                              {product.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#8b2727] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 group z-10"
                aria-label="Previous slide"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#8b2727] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 group z-10"
                aria-label="Next slide"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#8b2727] rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-10"
                aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
              >
                {isAutoPlaying ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Navigation Dots */}
            {totalDots > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {[...Array(totalDots)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`transition-all duration-300 rounded-full ${
                      currentSlide === index
                        ? "bg-[#8b2727] w-8 h-3 shadow-lg"
                        : "bg-gray-300 hover:bg-gray-400 w-3 h-3"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Progress Bar */}
            <div className="mt-6 bg-gray-200 rounded-full h-1 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#8b2727] to-[#a83333] h-full rounded-full transition-all duration-300"
                style={{
                  width: `${((currentSlide + 1) / totalDots) * 100}%`,
                }}
              />
            </div>

            {/* More Products Button */}
            <div className="flex justify-center mt-8">
              <Link
                href="/products"
                className="group bg-[#8b2727] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#d2af6f] transition-colors duration-200 flex items-center justify-center space-x-2 group cursor-pointer hover:text-black"
              >
                <span>View All Products</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;