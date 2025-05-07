'use client';

import { useEffect, useState, useRef } from 'react';

export default function AdminHeroPage() {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [headline, setHeadline] = useState('');
  const [subtext, setSubtext] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => {
        const hero = data.hero;
        if (hero) {
          setBackgroundImage(hero.backgroundImage || '/uploads/hero.jpg');
          setHeadline(hero.headline || '');
          setSubtext(hero.subtext || '');
        }
      });
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);

    if (selectedFile) {
      const localUrl = URL.createObjectURL(selectedFile);
      setPreview(localUrl);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/uploadHero', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      setBackgroundImage(data.url);
      URL.revokeObjectURL(preview); 
      setPreview(null); 
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fetch('/api/hero', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ backgroundImage, headline, subtext }),
    });

    setLoading(false);
    alert('Hero-секция обновлена!');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Редактировать Hero-секцию</h1>

      {/* Загрузка изображения */}
      <div>
        <label className="block font-medium mb-1">Изображение фона:</label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type="button"
          onClick={handleUpload}
          className="bg-gray-700 text-white px-3 py-1 rounded ml-2"
        >
          Загрузить
        </button>
        {(preview || backgroundImage) && (
          <img
            src={preview || backgroundImage}
            alt="Hero preview"
            className="mt-2 border max-h-60"
          />
        )}
      </div>

      {/* Заголовок */}
      <div>
        <label className="block font-medium mb-1">Заголовок:</label>
        <input
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      {/* Подтекст */}
      <div>
        <label className="block font-medium mb-1">Подтекст:</label>
        <textarea
          value={subtext}
          onChange={(e) => setSubtext(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Сохраняем...' : '💾Сохранить'}
      </button>
    </form>
  );
}
