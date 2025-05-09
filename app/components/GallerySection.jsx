'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const GalleryPage = () => {
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
      <div className="flex justify-center md:flex-row gap-4 items-start h-[650px] md:h-[866px]">
        {/* Основной слайдер */}
        <div className="md:w-[400px] w-[300px]">
          <Swiper
            style={{
              '--swiper-navigation-color': '#000',
              '--swiper-pagination-color': '#000',
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Navigation, Thumbs]}
            className="mySwiper2 md:w-[400px] w-[300px]"
          >
            {images.map((img) => (
              <SwiperSlide key={img._id}>
                <img
                  src={img.url}
                  alt="Work"
                  className="w-full h-auto object-contain rounded shadow"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Миниатюры */}
        <div className="w-full md:w-1/4 overflow-auto h-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={'auto'}
            watchSlidesProgress={true}
            direction={'vertical'}
            modules={[Thumbs]}
            className="mySwiper mySwiper-thumbs"
          >
            {images.map((img) => (
              <SwiperSlide key={img._id}>
                <img
                  src={img.url}
                  alt="Thumbnail"
                  className="w-full h-60 object-cover rounded shadow cursor-pointer opacity-60 hover:opacity-100 transition-opacity duration-300"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
