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
    console.error("❌ ProposSliderSection ожидает массив items, но получил:", items);
    return null;
  }

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto relative">
      {/* Custom arrows */}
      <button ref={prevRef} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#B8860B] text-white p-2 shadow w-10 rounded-full cursor-pointer hover:bg-[#D4AF37]">
        ◀
      </button>
      <button ref={nextRef} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#B8860B] text-white p-2 shadow w-10 rounded-full cursor-pointer hover:bg-[#D4AF37]">
        ▶
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
          1024: { slidesPerView: 3 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item._id || index} className="!h-auto">
            <div className="group relative overflow-hidden rounded-lg border-1 border-gray-[#B8860B]">
              <div className="absolute px-2 rounded-3xl font-semibold top-5 right-5 bg-amber-100">{item.price} &euro;</div>
              <img
                src={item.backgroundImage}
                alt={item.headline}
                className="w-full h-60 object-cover transform duration-300 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-sm text-center p-4">{item.subtext}</p>
              </div>
              <h2 className="mt-3 text-center text-xl font-bold min-h-20 p-2">{item.headline}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProposSliderSection;
