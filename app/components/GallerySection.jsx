'use client';

import { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/gallery');
        const data = await res.json();
        setImages(data || []);
      } catch (err) {
        console.error('Ошибка загрузки изображений:', err);
      }
    };
    fetchImages();
  }, []);

  const handleSlideChange = () => {
    const index = mainSwiperRef.current?.swiper.activeIndex || 0;
    setActiveIndex(index);
    if (thumbsSwiper) {
      thumbsSwiper.slideTo(index);
    }
  };

  if (images.length === 0) {
    return (
      <section className="p-4 container mx-auto text-center text-gray-500">
        <p>Нет доступных изображений.</p>
      </section>
    );
  }

  return (
    <section id="section-2" className="p-4 container mx-auto">
      <h2 className="text-5xl font-bold mb-4">Fotos unserer Arbeiten</h2>
      <div className="flex flex-col md:flex-row gap-4 items-start">
        
        {/* Основной слайдер */}
        <div className="md:w-[400px] w-full">
          <Swiper
            ref={mainSwiperRef}
            style={{
              '--swiper-navigation-color': '#000',
              '--swiper-pagination-color': '#000',
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="mySwiper2 w-full h-[650px] md:h-[866px]"
            onSlideChange={handleSlideChange}
          >
            {images.map((img) => (
              <SwiperSlide key={img._id}>
                <img
                  src={img.url}
                  alt="Work"
                  className="w-full h-full object-contain rounded shadow"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Миниатюры */}
        <div className="w-full overflow-y-auto max-h-[650px] md:max-h-[866px]">
          <div
            className="grid grid-cols-auto gap-2"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
          >
            {images.map((img, index) => (
              <div
                key={img._id}
                className={`w-full mb-2 md:mb-4 cursor-pointer transition-opacity duration-300 rounded shadow ${
                  activeIndex === index ? 'opacity-100' : 'opacity-60'
                }`}
                onClick={() => {
                  mainSwiperRef.current?.swiper.slideTo(index);
                  setActiveIndex(index);
                }}
              >
                <img
                  src={img.url}
                  alt="Thumbnail"
                  className="w-full h-24 md:h-50 object-cover rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
