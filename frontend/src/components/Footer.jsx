import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20 pt-16 pb-6">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="flex flex-col">
            <img src={assets.logo} className='w-[220px] h-[45px] mb-6' alt="DeepsFusion Logo" />
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Handcrafted artistic pieces created with passion and attention to detail. Each creation tells a unique story.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition duration-300">
                <FaFacebook className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition duration-300">
                <FaInstagram className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition duration-300">
                <FaTwitter className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition duration-300">
                <FaLinkedin className="text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="prata-regular text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-white transition duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="prata-regular text-lg font-bold text-white mb-6">Customer Service</h3>
            <ul className="space-y-4">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="prata-regular text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-purple-500 mt-1 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Art Street, Creative City, CC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-purple-500 flex-shrink-0" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition duration-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-purple-500 flex-shrink-0" />
                <a href="mailto:hello@deepsfusion.com" className="text-gray-400 hover:text-white transition duration-300">
                  hello@deepsfusion.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
            <p>&copy; {currentYear} Deep's Fusion. All rights reserved.</p>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition duration-300">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute left-0 top-0 w-40 h-40 bg-purple-500 opacity-5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute right-0 bottom-0 w-40 h-40 bg-pink-500 opacity-5 rounded-full translate-y-1/2 translate-x-1/2"></div>
    </footer>
  );
};

export default Footer;
