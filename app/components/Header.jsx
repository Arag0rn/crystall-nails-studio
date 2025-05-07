'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [header, setHeader] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      const res = await fetch('/api/getHeader');
      const data = await res.json();
      setHeader(data.header);
    };

    fetchHeader();
  }, []);

  if (!header) return null;

  const navigationArray = Object.entries(header)
  .filter(([key]) => key.startsWith('navigation'))
  .map(([_, value], index) => ({
    href: `#section-${index}`,
    label: value
  }));

  return (
    <header className="container mx-auto p-4 flex justify-between items-center h-30">
      <div className="flex items-center space-x-4 h-30">
        <img src="logo2.png" alt="Logo" className="w-50 h-40" />
        <nav className="space-x-4 text-sm md:text-base font-medium">
        {navigationArray.map((item, idx) => (
        <a key={idx} href={item.href} className="hover:underline">
        {item.label}
    </a>
  ))}
        </nav>
      </div>

      <a
        href={header.bookingLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        WhatsApp
      </a>
    </header>
  );
}