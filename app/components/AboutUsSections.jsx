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
      <section id="section-0" className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8 w-full ">
          {firstSection.imageUrl?.url && (
            <div className="w-full h-[400px] lg:w-[30%]">
              <div className="aspect-w-4 aspect-h-3 flex justify-center">
                <img
                  src={firstSection.imageUrl.url}
                  alt={firstSection.title}
                  className="h-[400px] object-cover rounded-lg shadow-md"
                />
              </div>
            </div>
          )}
          <div className="space-y-4 md:w-[70%] lg:w-[100%]">
            <h2 className="text-5xl font-bold text-[#B8860B]">{firstSection.title}</h2>
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
              <div key={sec._id} className="shadow-md rounded-lg overflow-hidden">
                {sec.imageUrl?.url && (
                  <img
                    src={sec.imageUrl.url}
                    alt={sec.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="bg-[#001741] text-white p-4 rounded-b-lg min-h-25">
                  <h3 className="text-xl font-semibold">{sec.title}</h3>
                  <p className="text-sm">{sec.content.substring(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}