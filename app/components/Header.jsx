'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [header, setHeader] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      label: value,
    }));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="relative z-50 p-4 flex justify-between items-center h-auto md:h-30 ">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img src="logo2.png" alt="Logo" className="w-32 h-auto md:w-50 md:h-40" />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        {/* Navigation Links */}
        <nav
          className={`hidden md:flex space-x-4 text-sm md:text-base font-medium text-white`}
        >
          {navigationArray.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="hover:bg-[#B8860B] py-2 px-4 rounded-md transition duration-300 text-2xl"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* WhatsApp Button */}
        <div className="hidden md:block">
          <a
            href={header.bookingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 font-[--font-playfair]"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full rounded-b-md py-4 bg-[#b1777f]">
          <nav className="flex flex-col items-center space-y-2 text-white">
            {navigationArray.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="block py-2 px-4 hover:bg-[#B8860B] rounded-md transition duration-300 w-full text-center"
                onClick={toggleMobileMenu} 
              >
                {item.label}
              </a>
            ))}
            {header.bookingLink && (
              <a
                href={header.bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 w-full text-center"
              >
                WhatsApp
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}