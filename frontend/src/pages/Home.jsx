import React, { useState } from 'react';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import Footer from '../components/Footer';
import { FaStar, FaHeart, FaTruck, FaShieldAlt, FaHeadset, FaGift, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';

const Home = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

const testimonials = [
  {
    id: 1,
    name: "Priyansh Sharma",
    role: "Art Enthusiast",
    content:
      "The eye sketches are absolutely mesmerizing! Each piece tells a unique story. DeepFusion has exceeded all my expectations.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=center"
  },
  {
    id: 2,
    name: "Rahul Verma",
    role: "Book Lover",
    content:
      "These handmade bookmarks are not just functional but works of art. They make reading even more enjoyable!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Anjali Patel",
    role: "Interior Designer",
    content:
      "The canvas paintings have transformed my client's space. The quality and attention to detail are outstanding.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  }
];



  
  const features = [
    {
      icon: <FaTruck className="text-3xl text-blue-600" />,
      title: "Free Shipping",
      description: "Free delivery on orders above ₹500"
    },
    {
      icon: <FaShieldAlt className="text-3xl text-green-600" />,
      title: "Quality Guarantee",
      description: "100% satisfaction or money back"
    },
    {
      icon: <FaHeadset className="text-3xl text-purple-600" />,
      title: "24/7 Support",
      description: "Always here to help you"
    },
    {
      icon: <FaGift className="text-3xl text-red-600" />,
      title: "Gift Wrapping",
      description: "Beautiful packaging included"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />
      
      {/* Collections Section */}
      <Collections />

      {/* Featured Products Banner */}
      <div className="mt-16 px-4">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full translate-y-24 -translate-x-24"></div>
          
          <div className="relative z-10 text-center">
            <h2 className="prata-regular text-3xl md:text-5xl font-bold mb-4">
              Discover Our Latest Creations
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Each piece is carefully crafted with love and attention to detail. Find the perfect addition to your collection.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-200 flex items-center gap-2 mx-auto">
              Explore Collection
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20 px-4">
        <div className="flex justify-center items-center mb-12">
          <h2 className="prata-regular text-3xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">WHY CHOOSE </span>
            <span className="text-gray-500">DEEP'S FUSION</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                {feature.icon}
              </div>
              <h3 className="prata-regular text-xl font-bold text-center text-[#111] mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-20 px-4">
        <div className="flex justify-center items-center mb-12">
          <h2 className="prata-regular text-3xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">WHAT OUR </span>
            <span className="text-gray-500">CUSTOMERS SAY</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <FaQuoteLeft className="text-3xl text-gray-300 mb-3" />
                <p className="text-gray-600 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-[#111]">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-20 px-4 mb-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <h2 className="prata-regular text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Be the first to know about new collections, exclusive offers, and behind-the-scenes stories from our studio.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-200 font-semibold"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm opacity-75 mt-4">
              Join 1000+ art lovers who get our updates
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="px-4 mb-16">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200 text-center">
          <h2 className="prata-regular text-3xl md:text-4xl font-bold text-[#111] mb-4">
            Ready to Start Your Collection?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Each piece tells a story. Let's find the perfect one for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-semibold">
              Shop Now
            </button>
            <button className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition duration-200 font-semibold">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
