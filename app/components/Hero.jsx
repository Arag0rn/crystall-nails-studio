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
      className="absolute w-full top-0 lg:h-[80vh] h-[700px] bg-cover bg-center flex items-center justify-center text-white text-center p-6"
      style={{ backgroundImage: `url(${hero.backgroundImage})` }}
    >
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
        <div className="relative z-10 container mx-auto p-8 rounded-lg bg-[#001741]/80">
        <h1 className="md:text-4xl text-xl text-white font-bold mb-4 uppercase">{hero.headline}</h1>
        <p className="md:text-2xl text-lg uppercase inline text-[#B8860B] tracking-[3px]">{hero.subtext}</p>
      </div>
    </section>
  );
}