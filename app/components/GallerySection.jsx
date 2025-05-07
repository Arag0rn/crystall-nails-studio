'use client';

import { useEffect, useState } from 'react';

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then(setImages);
  }, []);

  return (
    <section className="p-4 container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Fotos unserer Arbeiten</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-4 mx-auto">
        {images.map((img) => (
          <img
            key={img._id}
            src={img.url}
            alt="Work"
            className="w-full h-auto object-cover rounded shadow"
          />
        ))}
      </div>
    </section>
  );
}
