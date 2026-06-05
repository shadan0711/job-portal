import React from 'react';

const CountrySlider = () => {
  const countries = [
    "Dubai", "Saudi Arabia", "Kuwait", "Qatar", "Oman", 
    "Bahrain", "Jordan", "Egypt", "Abu Dhabi", "Sharjah"
  ];

  return (
    <div className="relative flex overflow-x-hidden border-b border-white/5 pb-10 mb-10 max-w-7xl mx-auto pt-12 ">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {/* Doubling the array for a seamless loop */}
        {[...countries, ...countries].map((country, index) => (
          <span 
            key={index} 
            className="mx-8 text-sm font-medium tracking-widest text-gray-500 hover:text-cyan-400 transition-colors cursor-default uppercase"
          >
            {country}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CountrySlider;