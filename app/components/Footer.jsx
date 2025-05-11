'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '../contex/LoadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Важно для стилей Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false; // Отключаем автоматическое добавление CSS, чтобы избежать конфликтов

export default function Footer() {
  const [footer, setFooter] = useState(null);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    fetch('/api/footer')
      .then((res) => res.json())
      .then((data) => setFooter(data.footer))
      .finally(() => setLoading(false));
  }, []);

  if (!footer) {
    return <div>Загрузка...</div>;
  }
  const social = footer.social || {};

  return (
    <footer className="text-white py-8">
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

        {/* Социальные сети с иконками */}
        <div className="flex justify-center space-x-6">
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:opacity-75"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
          )}
          {social.tiktok && (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-75"
            >
              <FontAwesomeIcon icon={faTiktok} size="lg" />
            </a>
          )}
          {/* Добавь другие социальные сети по аналогии */}
        </div>
      </div>
    </footer>
  );
}