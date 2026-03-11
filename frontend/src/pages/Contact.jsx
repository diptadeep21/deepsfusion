import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaLinkedin, FaHeart } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 sm:px-20 py-16 bg-white border-2 border-gray-300 rounded-lg mx-4 mt-4">
        {/* Left Side */}
        <div className="w-full sm:w-1/2 flex flex-col gap-6 text-[#333]">
          <p className="text-sm text-gray-500 tracking-widest uppercase">Get In Touch</p>
          <h1 className="prata-regular text-3xl md:text-5xl font-bold text-[#111] leading-tight">
            Let's Create Something Beautiful Together
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Have a question, custom order request, or just want to say hello? We'd love to hear from you! Reach out and let's start a conversation about bringing your vision to life.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaHeart className="text-red-500 text-xl" />
              <span className="text-sm text-gray-600">Always Here to Help</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-blue-500 text-xl" />
              <span className="text-sm text-gray-600">Quick Response</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full sm:w-1/2 mt-10 sm:mt-0 flex justify-center">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="max-w-full sm:max-w-[90%] md:max-w-[80%] lg:max-w-[75%] rounded-lg shadow-xl"
          />
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mt-12 px-4">
        <div className="flex justify-center items-center mb-8">
          <h2 className="prata-regular text-2xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">WAYS TO </span>
            <span className="text-gray-500">REACH US</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Phone */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaPhone className="text-2xl text-green-600" />
            </div>
            <h3 className="prata-regular text-xl font-bold text-center text-[#111] mb-3">Call Us</h3>
            <p className="text-gray-600 text-center leading-relaxed mb-2">
              +91 9970140241
            </p>
            <p className="text-sm text-gray-500 text-center">
              Mon-Sat: 9:00 AM - 7:00 PM
            </p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaEnvelope className="text-2xl text-blue-600" />
            </div>
            <h3 className="prata-regular text-xl font-bold text-center text-[#111] mb-3">Email Us</h3>
            <p className="text-gray-600 text-center leading-relaxed mb-2">
              deepfusion21@gmail.com
            </p>
            <p className="text-sm text-gray-500 text-center">
              We'll respond within 24 hours
            </p>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <FaMapMarkerAlt className="text-2xl text-purple-600" />
            </div>
            <h3 className="prata-regular text-xl font-bold text-center text-[#111] mb-3">Visit Us</h3>
            <p className="text-gray-600 text-center leading-relaxed mb-2">
              Pune, Maharashtra, India
            </p>
            <p className="text-sm text-gray-500 text-center">
              By appointment only
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="mt-16 px-4">
        <div className="flex justify-center items-center mb-8">
          <h2 className="prata-regular text-2xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">SEND US A </span>
            <span className="text-gray-500">MESSAGE</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                placeholder="What's this about?"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 resize-none"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </div>
            
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition duration-200 font-medium text-lg"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="mt-16 px-4 mb-16">
        <div className="flex justify-center items-center mb-8">
          <h2 className="prata-regular text-2xl md:text-4xl font-bold leading-tight text-center">
            <span className="text-black">FOLLOW OUR </span>
            <span className="text-gray-500">JOURNEY</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Stay connected with us on social media to see our latest creations, behind-the-scenes moments, and exclusive offers!
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Instagram */}
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <FaInstagram className="text-4xl text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Instagram</h3>
              <p className="text-sm text-gray-600">@deeps.fusion</p>
            </div>
            
            {/* Facebook */}
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <FaFacebook className="text-4xl text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Facebook</h3>
              <p className="text-sm text-gray-600">DeepFusion Art</p>
            </div>
            
            {/* YouTube */}
            <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <FaYoutube className="text-4xl text-red-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">YouTube</h3>
              <p className="text-sm text-gray-600">DeepFusion Art</p>
            </div>

            
            
            
            {/* LinkedIn */}
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <FaLinkedin className="text-4xl text-indigo-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">LinkedIn</h3>
              <p className="text-sm text-gray-600">DeepFusion</p>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              Made with <FaHeart className="inline text-red-500" /> by DeepFusion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
