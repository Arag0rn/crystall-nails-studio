'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    fetch('/api/hero')
      .then((res) => res.json())
      .then((data) => setHero(data.hero));
  }, []);

  if (!hero) return null;

  return (
    <section
      className="h-[80vh] bg-cover bg-center flex items-center justify-center text-white text-center p-6"
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
    >
      <div className="container mx-auto p-8 rounded-lg">
        <h1 className="text-4xl text-white font-bold mb-4">{hero.headline}</h1>
        <p className="text-lg text-white">{hero.subtext}</p>
      </div>
    </section>
  );
}