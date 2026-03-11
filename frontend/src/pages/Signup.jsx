import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaHeart, FaCheck } from 'react-icons/fa';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const { setToken, token, navigate, backendUrl } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    try {
      const response = await axios.post(backendUrl + '/api/user/register', { name: formData.name, email: formData.email, password: formData.password });
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const isPasswordValid = formData.password.length >= 8;
  const isPasswordMatch = formData.password === formData.confirmPassword && formData.confirmPassword !== '';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <img src={assets.logo} className="w-48 h-auto" alt="DeepFusion Logo" />
          </div>
          <h2 className="prata-regular text-3xl font-bold text-gray-900 mb-2">
            Join Our Community
          </h2>
          <p className="text-gray-600">
            Create your account and start your journey with handmade treasures
          </p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200"
                  placeholder="Your full name"
                />
            </div>

            {/* Email Field */}
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
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ${
                    formData.password ? (isPasswordValid ? 'border-green-300' : 'border-red-300') : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className={`mt-2 text-sm ${isPasswordValid ? 'text-green-600' : 'text-red-600'}`}>
                  {isPasswordValid ? (
                    <div className="flex items-center gap-1">
                      <FaCheck className="text-xs" />
                      Password meets requirements
                    </div>
                  ) : (
                    'Password must be at least 8 characters long'
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ${
                    formData.confirmPassword ? (isPasswordMatch ? 'border-green-300' : 'border-red-300') : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {formData.confirmPassword && (
                <div className={`mt-2 text-sm ${isPasswordMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {isPasswordMatch ? (
                    <div className="flex items-center gap-1">
                      <FaCheck className="text-xs" />
                      Passwords match
                    </div>
                  ) : (
                    'Passwords do not match'
                  )}
                </div>
              )}
            </div>

            {/* Terms and Newsletter */}
            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="accept-terms"
                  name="accept-terms"
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{' '}
                  <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition duration-200">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition duration-200">
                    Privacy Policy
                  </a>
                  *
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  id="accept-newsletter"
                  name="accept-newsletter"
                  type="checkbox"
                  checked={acceptNewsletter}
                  onChange={(e) => setAcceptNewsletter(e.target.checked)}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="accept-newsletter" className="ml-2 block text-sm text-gray-700">
                  I would like to receive updates about new products and exclusive offers
                </label>
              </div>
            </div>

            {/* Signup Button */}
            <div>
              <button
                type="submit"
                disabled={!acceptTerms || !isPasswordValid || !isPasswordMatch}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>
          </div>

          {/* Social Signup Buttons */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200">
              <FaGoogle className="text-red-500" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200">
              <FaFacebook className="text-blue-600" />
            </button>
            <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-200">
              <FaApple className="text-gray-800" />
            </button>
          </div>
        </div>

        {/* Login Link */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500 transition duration-200">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Made with <FaHeart className="inline text-red-500" /> by DeepFusion
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 