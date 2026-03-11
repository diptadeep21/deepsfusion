import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setToken, backendUrl, navigate } = useContext(ShopContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                toast.success("Welcome back, Admin!");
                navigate('/admin/dashboard');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 animate-fade-in-up">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <img src={assets.logo} className="w-48 h-auto" alt="DeepFusion Logo" />
                    </div>
                    <h2 className="prata-regular text-3xl font-bold text-gray-900 mb-2">
                        Admin Portal
                    </h2>
                    <p className="text-gray-600">
                        Sign in to manage your store
                    </p>
                </div>

                {/* Login Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                    <form onSubmit={onSubmitHandler} className="space-y-6">
                        <div className='mb-6'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                                type="email"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>
                        <div className='mb-6'>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 outline-none"
                                type="password"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <button
                            className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                            type="submit"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin;
