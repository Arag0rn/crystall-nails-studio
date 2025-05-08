'use client';

import { useEffect, useState } from 'react';

export default function AboutUsSections() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/about-sections')
      .then((res) => res.json())
      .then((data) => setSections(data.sections));
  }, []);

  return (
   <section id='section-0' className="space-y-8 container mx-auto px-4 py-12 mt-[70vh]">
  {sections.map((sec) => (
    <div
      key={sec._id}
      className="flex flex-col md:flex-row md:items-start gap-8"
    >
      {/* Image Grid */}
      {sec.imageUrls?.length > 0 && (
        <div className="w-full md:w-1/2 lg:w-1/5">
          {sec.imageUrls.slice(0, 1).map((url, i) => ( // Показывать только первое изображение
            <img
              key={i}
              src={url}
              alt="About section"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          ))}
          {sec.imageUrls.length > 1 && (
            <div className="mt-2 text-sm text-gray-500">
              + {sec.imageUrls.length - 1} more images
            </div>
          )}
        </div>
      )}

      {/* Text Content */}
      <div className="md:w-1/2 lg:w-3/5 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">{sec.title}</h2>
        <p className="text-gray-700 whitespace-pre-line">{sec.content}</p>
        {sec.cta && (
          <button className="mt-2 bg-[#B8860B] text-white px-6 py-3 rounded-full hover:bg-[#D4AF37] font-semibold">
            {sec.cta}
          </button>
        )}
      </div>
    </div>
  ))}
</section>
  );
}
