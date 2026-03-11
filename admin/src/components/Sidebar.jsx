import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBoxOpen, FaPlusSquare, FaList } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] hidden md:flex flex-col py-6 px-4 sticky top-16">
        <div className="space-y-2">
            <NavLink 
                to="/add"
                className={({isActive}) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                        ? 'bg-purple-50 text-purple-700 font-medium shadow-sm ring-1 ring-purple-100' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
            >
                <FaPlusSquare className={`text-xl transition-transform group-hover:scale-110 duration-200`}/>
                <span>Add Product</span>
            </NavLink>

            <NavLink 
                to="/list"
                className={({isActive}) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                        ? 'bg-purple-50 text-purple-700 font-medium shadow-sm ring-1 ring-purple-100' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
            >
                <FaList className={`text-xl transition-transform group-hover:scale-110 duration-200`}/>
                <span>List Products</span>
            </NavLink>

            <NavLink 
                to="/orders"
                className={({isActive}) => `
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                    ${isActive 
                        ? 'bg-purple-50 text-purple-700 font-medium shadow-sm ring-1 ring-purple-100' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
            >
                <FaBoxOpen className={`text-xl transition-transform group-hover:scale-110 duration-200`}/>
                <span>Orders</span>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar;