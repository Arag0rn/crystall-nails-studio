'use client';

import { useEffect, useState } from 'react';

export default function Footer() {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch('/api/footer')
      .then((res) => res.json())
      .then((data) => setFooter(data.footer));
  }, []);

  if (!footer) {
    return <div>Загрузка...</div>;
  }
  const social = footer.social || {};

  return (
    <footer className=" text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 container">
        {/* Логотип */}
        {footer.logoUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={footer.logoUrl}
              alt="Logo"
              className="h-12"
            />
          </div>
        )}

        {/* Контактная информация */}
        <div className="text-center mb-6">
          <p className="text-lg">{footer.copyright}</p>
          <p className="mt-2 text-sm">Телефон: {footer.phone}</p>
          <p className="mt-1 text-sm">{footer.address}</p>
        </div>

        {/* Дополнительные ссылки */}
        {footer.links?.length > 0 && (
          <div className="flex justify-center space-x-4 mb-6">
            {footer.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="text-sm text-blue-400 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* Социальные сети */}
        <div className="flex justify-center space-x-6">
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-pink-500 hover:underline"
            >
              Instagram
            </a>
          )}
          {social.tiktok && (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black hover:underline"
            >
              TikTok
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}