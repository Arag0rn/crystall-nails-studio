'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const ProposSliderSection = ({ items = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!Array.isArray(items)) {
    return null;
  }

  return (
    <section className="py-10 px-4 mx-auto relative">
      {/* Custom arrows */}
      <button
        ref={prevRef}
        className="absolute w-[50px] h-[50px] left-[-10px] top-1/2 transform -translate-y-1/2 z-10 text-[#B8860B] hover:text-[#D4AF37] cursor-pointer"
        aria-label="Previous slide"
      >
        <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        ref={nextRef}
        className="absolute  w-[50px] h-[50px] right-[-10px] top-1/2 transform -translate-y-1/2 z-10 text-[#B8860B] hover:text-[#D4AF37] cursor-pointer"
        aria-label="Next slide"
      >
        <svg width={50} height={50} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        modules={[ Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item._id || index} className="!h-auto">
            <div className="group relative overflow-hidden rounded-lg">
              <div className="absolute p-2 text-[#001741] rounded-3xl font-semibold top-5 right-5 bg-[#B8860B]">{item.price} &euro;</div>
              <img
                src={item.backgroundImage}
                alt={item.headline}
                className="w-full h-60 object-cover transform duration-300 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-sm text-center p-4">{item.subtext}</p>
              </div>
              <h3 className="flex text-center justify-center items-center text-xl font-bold min-h-30 overflow-hidden p-2 bg-[#001741]">{item.headline}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProposSliderSection;
