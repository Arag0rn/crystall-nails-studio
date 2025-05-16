'use client';

import { useEffect, useState } from 'react';
import { useLoading } from '../contex/LoadingContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Важно для стилей Font Awesome
import { config } from '@fortawesome/fontawesome-svg-core';
import LogoWrapper from './LogoWrapper'; 
config.autoAddCss = false;

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
    <footer className="text-black py-8">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">



        {/* Контактная информация */}
        <div className="text-center flex gap-5 flex-wrap w-[30%]">
          <p className="text-lg">{footer.copyright}</p>
          <p className="text-sm">Телефон: {footer.phone}</p>
          <p className="text-sm">{footer.address}</p>
        </div>

                {/* Логотип */}
      {footer.logoUrl && (
         LogoWrapper({ logoUrl: footer.logoUrl })
      )}

        {/* Дополнительные ссылки */}
        {footer.links?.length > 0 && (
          <div className="flex justify-center space-x-4 mb-6 ">
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
        <div className="flex justify-center space-x-6 w-[30%]">
          {social.instagram && (
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:opacity-75 w-[50px] h-[50px]"
            >
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '50px' }} />
            </a>
          )}
          {social.tiktok && (
            <a
              href={social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:opacity-75 w-[50px] h-[50px]"
            >
              <FontAwesomeIcon icon={faTiktok} style={{ fontSize: '50px' }} />
            </a>
          )}
          {/* Добавь другие социальные сети по аналогии */}
        </div>
      </div>
    </footer>
  );
}