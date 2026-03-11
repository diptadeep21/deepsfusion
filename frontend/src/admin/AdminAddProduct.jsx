import React, { useState, useContext } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AdminAddProduct = () => {
    const { backendUrl, token } = useContext(ShopContext);

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { Authorization: `Bearer ${token}` } });

            if (response.data.success) {
                toast.success(response.data.message);
                setName("");
                setDescription("");
                setPrice("");
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setSizes([]);
                setBestseller(false);
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const toggleSize = (size) => {
        setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]);
    }

    return (
        <div className="w-full animate-fade-in pb-16">
             <div className="mb-8">
                <h1 className="prata-regular text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
                <p className="text-gray-600">Create a new product in your store</p>
            </div>

            <form onSubmit={onSubmitHandler} className='bg-white p-8 rounded-xl shadow-sm border border-gray-100 max-w-4xl'>
                
                {/* Image Upload Section */}
                <div className="mb-8">
                    <label className='block text-gray-700 font-medium mb-4'>Product Images</label>
                    <div className='flex gap-4 flex-wrap'>
                        {[image1, image2, image3, image4].map((img, index) => {
                            const setImg = [setImage1, setImage2, setImage3, setImage4][index];
                            return (
                                <label key={index} className='cursor-pointer group relative w-28 h-28 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:border-purple-400'>
                                    {!img ? (
                                        <div className='text-center text-gray-400 group-hover:text-purple-500 transition-colors'>
                                            <FaCloudUploadAlt className='text-2xl mx-auto mb-1' />
                                            <span className='text-xs font-medium'>Upload</span>
                                        </div>
                                    ) : (
                                        <div className="relative w-full h-full">
                                            <img className='w-full h-full object-cover rounded-xl' src={URL.createObjectURL(img)} alt="" />
                                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-white text-xs">Change</div>
                                        </div>
                                    )}
                                    <input onChange={(e) => setImg(e.target.files[0])} type="file" hidden />
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Product Details */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-8'>
                    <div className="space-y-6">
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Product Name</label>
                            <input 
                                onChange={(e) => setName(e.target.value)} 
                                value={name} 
                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all' 
                                type="text" 
                                placeholder="e.g. Cotton T-Shirt" 
                                required 
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Description</label>
                            <textarea 
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description} 
                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all min-h-[120px]' 
                                placeholder="Product description..." 
                                required 
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Category</label>
                                <select 
                                    onChange={(e) => setCategory(e.target.value)} 
                                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white'
                                >
                                    <option value="Originals">Originals</option>
                                    <option value="Prints">Prints</option>
                                    <option value="Merchandise">Merchandise</option>
                                </select>
                            </div>
                            <div>
                                <label className='block text-sm font-medium text-gray-700 mb-2'>Sub Category</label>
                                <select 
                                    onChange={(e) => setSubCategory(e.target.value)} 
                                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white'
                                >
                                    <option value="Abstract">Abstract</option>
                                    <option value="Landscape">Landscape</option>
                                    <option value="Portrait">Portrait</option>
                                    <option value="Still Life">Still Life</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Product Price</label>
                            <input 
                                onChange={(e) => setPrice(e.target.value)} 
                                value={price} 
                                className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all' 
                                type="number" 
                                placeholder="25" 
                                required 
                            />
                        </div>
                    </div>
                </div>

                {/* Sizes */}
                <div className="mb-8">
                    <label className='block text-sm font-medium text-gray-700 mb-3'>Product Sizes</label>
                    <div className='flex gap-3'>
                        {["Original", "A5", "A4", "A3", "A2"].map((size) => (
                            <div 
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-200 border ${
                                    sizes.includes(size) 
                                        ? 'bg-purple-50 border-purple-500 text-purple-700 font-bold ring-1 ring-purple-500' 
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                                }`}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bestseller Checkbox */}
                <div className="flex items-center gap-3 mb-8">
                    <input 
                        onChange={() => setBestseller(prev => !prev)} 
                        checked={bestseller} 
                        type="checkbox" 
                        id="bestseller" 
                        className='w-5 h-5 text-purple-600 rounded border-gray-300 focus:ring-purple-500 cursor-pointer'
                    />
                    <label className='cursor-pointer text-gray-700 font-medium' htmlFor="bestseller">Add to Bestseller</label>
                </div>

                <button type="submit" className='w-full py-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-[1.01] active:scale-95'>
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AdminAddProduct;
