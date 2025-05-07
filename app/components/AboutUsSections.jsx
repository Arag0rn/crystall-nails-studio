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
    <section id='section-0' className="space-y-16 my-8 container mx-auto px-4">
      {sections.map((sec) => (
        <div
          key={sec._id}
          className="flex flex-col md:flex-row md:items-start gap-6"
        >

          {/* Image Grid */}
          {sec.imageUrls?.length > 0 && (
            <div className="md:w-[30%] grid grid-cols-1 gap-4">
              {sec.imageUrls.map((url, i) => (
                <div
                  key={i}
                  className="relative w-full pt-[100%] bg-gray-100 rounded overflow-hidden shadow"
                >
                  <img
                    src={url}
                    alt="About section"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

               {/* Text Content */}
               <div className="md:w-[60%] space-y-4 my-auto">
            <h2 className="text-2xl font-bold">{sec.title}</h2>
            <p className="text-gray-700 whitespace-pre-line">{sec.content}</p>
            {sec.cta && (
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                {sec.cta}
              </button>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
