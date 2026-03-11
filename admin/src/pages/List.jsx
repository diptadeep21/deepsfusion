import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa'
import { ShopContext } from '../context/ShopContext'

const List = () => {

  const { backendUrl, token } = useContext(ShopContext);
  const [list, setList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      if (response.data.success) {
        setList(response.data.products);
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { Authorization: `Bearer ${token}` } })

      if (response.data.success) {
        toast.success("Product removed successfully")
        await fetchList();
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchList()
  }, [])

  // Filter products based on search
  const filteredList = list.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="prata-regular text-2xl font-bold text-gray-800 mb-1">
            <span className="text-black">ALL</span> <span className="text-gray-500">PRODUCTS</span>
          </h2>
          <p className="text-gray-500 text-sm">Manage your product inventory</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 w-full md:w-64"
          />
        </div>
      </div>

      {/* Products Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {filteredList.length} of {list.length} products
      </div>

      {/* Table Container */}
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
        
        {/* Table Header */}
        <div className='hidden md:grid grid-cols-[80px_2fr_1fr_1fr_1fr_120px] items-center py-4 px-6 bg-gray-50 border-b border-gray-200'>
          <b className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</b>
          <b className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</b>
          <b className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</b>
          <b className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</b>
          <b className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</b>
          <b className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Action</b>
        </div>

        {/* Product Rows */}
        <div className='divide-y divide-gray-100'>
          {filteredList.length === 0 ? (
            <div className="py-12 text-center text-gray-500">
              <p>No products found</p>
            </div>
          ) : (
            filteredList.map((item, index) => (
              <div className='grid grid-cols-[80px_1fr] md:grid-cols-[80px_2fr_1fr_1fr_1fr_120px] items-center gap-4 py-4 px-6 hover:bg-gray-50 transition-colors duration-150' key={index}>
                <img className='w-16 h-16 object-cover rounded-lg shadow-sm' src={item.image[0]} alt={item.name} />
                
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 md:hidden">{item.category}</p>
                </div>
                
                <p className="text-gray-600 hidden md:block">{item.category}</p>
                <p className="font-medium text-gray-900 hidden md:block">${item.price}</p>
                
                <div className="hidden md:flex justify-center">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => removeProduct(item._id)}
                    className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-150'
                    title="Delete product"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default List

