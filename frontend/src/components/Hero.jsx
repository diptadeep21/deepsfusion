import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="relative overflow-hidden flex flex-col sm:flex-row items-center justify-between px-6 sm:px-16 lg:px-24 py-14 bg-gradient-to-br from-[#f9fafb] via-[#f3f4f6] to-[#e5e7eb] rounded-3xl shadow-lg">

      {/* Decorative Blur */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-black/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

      {/* Left Content */}
      <div className="relative z-10 w-full sm:w-1/2 flex flex-col gap-6 text-[#111]">
        <p className="text-sm text-gray-500 tracking-[0.25em] uppercase">
          Made for you
        </p>

        <h1 className="prata-regular text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Personalized <br />
          <span className="text-gray-700">Creations</span>
        </h1>

        <p className="text-gray-600 max-w-md">
          Discover thoughtfully designed products crafted to match your unique style and personality.
        </p>

        <button className="group relative w-fit px-7 py-3 rounded-full bg-black text-white font-medium tracking-wide overflow-hidden">
          <span className="relative z-10">Grab Yours</span>
          <span className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      {/* Right Image */}
      <div className="relative z-10 w-full sm:w-1/2 mt-12 sm:mt-0 flex justify-center">
        <img
          src={assets.hero_img}
          alt="Hero"
          className="max-w-[85%] rounded-2xl shadow-2xl transform transition duration-500 hover:scale-105 hover:-rotate-1"
        />
      </div>

    </div>
  );
};

export default Hero;
