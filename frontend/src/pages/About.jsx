import React from 'react';
import { assets } from '../assets/assets';
import { FaHeart, FaPalette, FaHandshake, FaStar, FaUsers, FaAward } from 'react-icons/fa';
import myImage from '../assets/my-image.png';


const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-20 py-16 bg-white border-2 border-gray-300 rounded-lg mx-4 mt-4">
        {/* Left Side */}
        <div className="w-full sm:w-1/2 flex flex-col gap-6 text-[#333]">
          <p className="text-sm text-gray-500 tracking-widest uppercase">Our Story</p>
          <h1 className="prata-regular text-3xl md:text-5xl font-bold text-[#111] leading-tight">
            Crafting Dreams Into Reality
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We are passionate artisans dedicated to creating unique, handmade pieces that bring joy and beauty to your everyday life. Every creation is crafted with love, attention to detail, and a commitment to quality.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-500 text-xl" />
              <span className="text-sm text-gray-600">Handcrafted with Love</span>
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500 text-xl" />
              <span className="text-sm text-gray-600">Premium Quality</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-1/2 mt-10 sm:mt-0 flex justify-center">
          <img
            src={assets.about_img}
            alt="About Us"
            className="max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[75%] rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Our Story Section */}
      <div className="mt-12 px-4">
        <div className="flex justify-center items-center mb-8">
          <h2 className="prata-regular text-2xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">OUR </span>
            <span className="text-gray-500">JOURNEY</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="prata-regular text-2xl font-bold text-[#111] mb-4">How It All Began</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                DeepFusion started as a small passion project in 2020, born from the love of creating beautiful, meaningful pieces that connect with people on a personal level. What began with simple polaroids and bookmarks has grown into a diverse collection of handcrafted treasures.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our journey has been driven by the belief that every piece should tell a story, evoke emotion, and bring a touch of handmade magic to your daily life. From intricate eye sketches to vibrant canvas paintings, each creation is a labor of love.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to grow and evolve, always staying true to our roots of quality craftsmanship and personal touch. Every order is handled with care, every piece is made with intention, and every customer becomes part of our story.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
                  <FaPalette className="text-6xl text-purple-600" />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaHeart className="text-2xl text-red-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-xl text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mt-16 px-4">
        <div className="flex justify-center items-center mb-8">
          <h2 className="prata-regular text-2xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">OUR </span>
            <span className="text-gray-500">VALUES</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Value 1 */}
         {/*<div className="bg-primary hover:bg-primary-dull transition duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaHeart className="text-2xl text-red-500" />
            </div>
            <h3 className="prata-regular text-xl font-bold text-center text-[#111] mb-3">Crafted with Love</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              Every piece is created with genuine passion and care. We pour our heart into every detail, ensuring that each creation carries the warmth of human touch.
            </p>
          </div>.  */}

           
          <div className="group bg-gradient-to-br from-white via-red-50 to-red-100
                hover:from-red-50 hover:to-red-170
                transition-all duration-500 ease-in-out
                rounded-2xl shadow-lg shadow-red-200/50 hover:shadow-red-300/60
                p-8 transform hover:-translate-y-2 hover:scale-[1.02]">

  <div className="w-20 h-20 bg-white
                  rounded-full flex items-center justify-center
                  mb-5 mx-auto shadow-md shadow-red-200
                  group-hover:scale-110 transition duration-300">
    <FaHeart className="text-3xl text-red-400 group-hover:animate-pulse" />
  </div>

  <h3 className="prata-regular text-2xl font-bold text-center text-gray-900 mb-3 tracking-wide">
    Crafted with Love
  </h3>

  <p className="text-gray-600 text-center leading-relaxed text-sm">
    Every piece is created with genuine passion and care. We pour our heart into every detail, ensuring that each creation carries the warmth of human touch.
  </p>

</div>




          {/* Value 2 */}
        { /* <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaHandshake className="text-2xl text-blue-500" />
            </div>
            <h3 className="prata-regular text-xl font-bold text-center text-[#111] mb-3">Quality Commitment</h3>
            <p className="text-gray-600 text-center leading-relaxed">
              We never compromise on quality. From the finest materials to the most meticulous craftsmanship, we ensure every piece meets our high standards.
            </p>
          </div>
          */}


             <div className="group bg-gradient-to-br from-white via-sky-50 to-sky-100
                hover:from-sky-50 hover:to-sky-170
                transition-all duration-500 ease-in-out
                rounded-2xl shadow-lg shadow-sky-200/50 hover:shadow-sky-300/60
                p-8 transform hover:-translate-y-2 hover:scale-[1.02]">

  <div className="w-20 h-20 bg-white
                  rounded-full flex items-center justify-center
                  mb-5 mx-auto shadow-md shadow-sky-200
                  group-hover:scale-110 transition duration-300">
    <FaHandshake className="text-3xl text-sky-400 group-hover:animate-pulse" />
  </div>

  <h3 className="prata-regular text-2xl font-bold text-center text-gray-900 mb-3 tracking-wide">
    Quality Commitment
  </h3>

  <p className="text-gray-600 text-center leading-relaxed text-sm">
    We never compromise on quality. From the finest materials to the most meticulous craftsmanship, we ensure every piece meets our high standards.
  </p>

</div>

          

          {/* Value 3 */}
          <div className="group bg-gradient-to-br from-white via-green-50 to-green-100
                hover:from-green-50 hover:to-green-170
                transition-all duration-500 ease-in-out
                rounded-2xl shadow-lg shadow-green-200/50 hover:shadow-green-300/60
                p-8 transform hover:-translate-y-2 hover:scale-[1.02]">

  <div className="w-20 h-20 bg-white
                  rounded-full flex items-center justify-center
                  mb-5 mx-auto shadow-md shadow-green-200
                  group-hover:scale-110 transition duration-300">
    <FaUsers className="text-3xl text-green-400 group-hover:animate-pulse" />
  </div>

  <h3 className="prata-regular text-2xl font-bold text-center text-gray-900 mb-3 tracking-wide">
    Community First
  </h3>

  <p className="text-gray-600 text-center leading-relaxed text-sm">
    We believe in building meaningful connections with our customers. Your satisfaction and happiness are at the heart of everything we do.
  </p>

</div>

        </div>
      </div> 
      

      {/* Team Section */}
      <div className="mt-16 px-4 mb-16">
        <div className="flex justify-center items-center mb-8">
          <h2 className="prata-regular text-2xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">MEET THE </span>
            <span className="text-gray-500">ARTISAN</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                <img 
  src={myImage}
  alt="Custom Icon" 
  className="w-full h-full object-cover rounded-full"
/>

                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <FaStar className="text-lg text-yellow-600" />
                </div>
              </div>
            </div>
            <div>
              <h3 className="prata-regular text-2xl font-bold text-[#111] mb-4">The Creative Mind</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Hi, I'm Diptadeep Sarkar the passionate creator behind Deep's Fusion. With years of experience in various art forms, 
                I've dedicated my free time to bringing beauty and joy through handmade creations.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                From the delicate strokes of eye sketches to the vibrant colors of canvas paintings, 
                every piece reflects my commitment to excellence and love for art. I believe that art has the power 
                to transform spaces and touch hearts.s
              </p>
              <p className="text-gray-600 leading-relaxed">
                When you choose DeepsFusion, you're not just buying a product – you're becoming part of a story, 
                a journey of creativity and passion that I'm honored to share with you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
