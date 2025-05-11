'use client';

import { useEffect, useState, useRef } from 'react';
import { useLoading } from '../../contex/LoadingContext';

export default function AdminGalleryPage() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const fileRef = useRef();
  const { setLoading } = useLoading();

  

  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => res.json())
      .then(setImages)
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/uploadGallery', {
      method: 'POST',
      body: formData,
    });

    const newImage = await res.json();
    setImages((prev) => [newImage, ...prev]);
    setFile(null);
    fileRef.current.value = '';
  };

  const handleDelete = async (id) => {
    await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
    setImages((prev) => prev.filter((img) => img._id !== id));
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Галерея: управление фото</h1>
      <div className="flex items-center gap-4 mb-6">
        <input
          type="file"
          ref={fileRef}
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Загрузить
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="relative">
            <img
              src={img.url}
              alt=""
              className="w-full object-cover rounded shadow"
            />
            <button
              onClick={() => handleDelete(img._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
