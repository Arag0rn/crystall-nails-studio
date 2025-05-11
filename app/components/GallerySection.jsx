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
    if (thumbsSwiper && mainSwiperRef.current?.swiper) {
      thumbsSwiper.slideTo(mainSwiperRef.current.swiper.activeIndex);
    }
  };

  const syncThumbs = (swiper) => {
    setThumbsSwiper(swiper);
  };

  if (images.length === 0) {
    return (
      <section className="p-4 container mx-auto text-center text-gray-500">
        <p>Нет доступных изображений.</p>
      </section>
    );
  }

  return (
    <section className="p-4 container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Fotos unserer Arbeiten</h2>
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

        {/* Миниатюры в многоколоночном виде */}
        <div className="w-full overflow-y-auto max-h-[650px] md:max-h-[866px]">
          <div
            className="mySwiper mySwiper-thumbs grid grid-cols-auto w=full gap-2"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={img._id}

                className="w-full mb-2 md:mb-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300 rounded shadow"
                onClick={() => mainSwiperRef.current?.swiper.slideTo(index)}
              >
                <img
                  src={img.url}
                  alt="Thumbnail"
                  className="w-full h-24 md:h-50 object-cover rounded"
                />
              </SwiperSlide>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;