'use client';

import { useEffect, useState } from 'react';

export default function AboutUsSections() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/about-sections')
      .then((res) => res.json())
      .then((data) => setSections(data.sections));
  }, []);

  if (sections.length === 0) {
    return <div>Загрузка...</div>; // Или какой-то другой индикатор загрузки
  }

  const firstSection = sections[0];
  const remainingSections = sections.slice(1);

  return (
    <>
      {/* Первая секция */}
      <section id="section-0" className="container mx-auto px-4 py-12 mt-[70vh]">
        <div className="flex flex-col md:flex-row gap-8 w-full ">
          {firstSection.imageUrls?.length > 0 && (
            <div className="w-full h-[400px]">
              {firstSection.imageUrls.slice(0, 1).map((url, i) => (
                <div key={i} className="aspect-w-4 aspect-h-3 flex justify-center">
                  <img
                    src={url}
                    alt="About section"
                    className="h-[400px] object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">{firstSection.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{firstSection.content}</p>
            {firstSection.cta && (
              <button className="mt-2 bg-[#B8860B] text-white px-6 py-3 rounded-full hover:bg-[#D4AF37] font-semibold">
                {firstSection.cta}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Карточки остальных секций */}
      {remainingSections.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-20 md:grid-cols-2 lg:grid-cols-3">
            {remainingSections.map((sec) => (
              <div key={sec._id} className="space-y-2">
                {sec.imageUrls?.length > 0 && (
                  <img
                    src={sec.imageUrls[0]} // Берем первое изображение для карточки
                    alt={sec.title}
                    className="w-full h-48 object-cover rounded-md shadow-md"
                  />
                )}
                <h3 className="text-xl font-semibold text-gray-800">{sec.title}</h3>
                <p className="text-gray-600 text-sm">{sec.content.substring(0, 100)}...</p> {/* Показываем краткое содержание */}
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}