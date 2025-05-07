'use client';

import { useEffect, useState } from 'react';

export default function DiscountBanner() {
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    fetch('/api/discount')
      .then((res) => res.json())
      .then((data) => setDiscount(data.discount));
  }, []);

  if (!discount?.enabled) return null;
  

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mt-[-10px] rounded">
      <h2 className="text-xl font-bold text-yellow-800">
        {discount.reason}: -{discount.amount} Rabatt
      </h2>
      <p className="text-yellow-700 mt-1">{discount.description}</p>
    </div>
  );
}
