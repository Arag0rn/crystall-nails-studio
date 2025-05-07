import React from 'react';

const ProposSection = ({ backgroundImage, headline, subtext, reverse = false }) => {
 return (
  <section
    className="gap-8 items-start  md:flex"
    id="angebote"
    style={{ direction: reverse ? 'rtl' : 'ltr' }}
  >
    <div className="rounded-lg shadow-lg bg-cover bg-center md:w-1/3">
      <img
          src={backgroundImage}
          alt="background"
          className="w-full h-auto object-cover shadow-lg rounded-lg"
        />
     </div>
     <div className="text-left flex flex-col justify-center w-full" style={{ direction: 'ltr' }}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">{headline}</h2>
      <p className="text-base sm:text-m">{subtext}</p>
    </div>
  </section>
);
};

export default ProposSection;