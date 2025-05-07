'use client';

import { useEffect, useState } from 'react';

export default function AdminMapSection() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/map')
      .then((res) => res.json())
      .then((data) => setAddress(data.address));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/map', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address }),
    });
    setLoading(false);
    alert('Адрес обновлён!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <h1 className="text-2xl font-bold">Редактировать адрес</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full border p-2 rounded"
        placeholder="Введите адрес"
      />
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
