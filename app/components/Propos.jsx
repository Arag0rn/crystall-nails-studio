'use client';

import { useEffect, useState } from 'react';
import ProposSection from './ProposSection'; // Проверь путь к компоненту!

export default function OurProposPage() {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    fetch('/api/ourPropos')
      .then((res) => res.json())
      .then((data) => {
        if (data.propos?.items) {
          setSections(data.propos.items);
        }
      });
  }, []);

  if (!sections.length) return null;

  return (
    <section className="container mx-auto p-4">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">Unsere Angebote</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8" >
      {sections.map((section) => (
        <ProposSection
          key={section._id}
          backgroundImage={section.backgroundImage}
          headline={section.headline}
          subtext={section.subtext}
        />
      ))}
      </div>
    </section>
  );
}