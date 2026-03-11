import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = products.find(product => product._id === items)
                        if (itemInfo) {
                            orderItems.push({
                                productId: itemInfo._id,
                                name: itemInfo.name,
                                price: itemInfo.price,
                                quantity: cartItems[items][item],
                                image: itemInfo.image && itemInfo.image[0] ? itemInfo.image[0] : ''
                            })
                        }
                    }
                }
            }

            if (orderItems.length === 0) {
                toast.error('No items in cart');
                return;
            }

            let orderData = {
                orderItems: orderItems,
                shippingAddress: {
                    name: formData.firstName + ' ' + formData.lastName,
                    address: formData.street,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.zipcode,
                    phone: formData.phone
                },
                paymentMethod: method.toUpperCase(),
                totalAmount: getCartAmount() + delivery_fee
            }

            console.log('Sending order data:', orderData);

            switch (method) {

                // API Calls for COD
                case 'cod': {
                    try {
                        const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { Authorization: `Bearer ${token}` } })
                        if (response.data.success) {
                            toast.success('Order placed successfully!');
                            setCartItems({})
                            navigate('/orders')
                        } else {
                            toast.error(response.data.message || 'Failed to place order')
                        }
                    } catch (axiosError) {
                        console.error('Axios Error:', axiosError);
                        console.error('Error Response:', axiosError.response?.data);
                        
                        const errorMessage = axiosError.response?.data?.message || 
                                           axiosError.response?.data?.error ||
                                           axiosError.message || 
                                           'Failed to place order';
                        
                        console.error('Final Error Message:', errorMessage);
                        toast.error(errorMessage);
                    }
                    break;
                }

                default:
                    break;
            }

        } catch (error) {
            console.error('Outer Error:', error)
            toast.error(error.message || 'An error occurred')
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <h2 className='inline-flex items-center gap-2 font-medium'>DELIVERY INFORMATION</h2>
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
                    <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
                <input required onChange={onChangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='city' value={formData.city} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
                    <input required onChange={onChangeHandler} name='state' value={formData.state} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
                    <input required onChange={onChangeHandler} name='country' value={formData.country} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
                </div>
                <input required onChange={onChangeHandler} name='phone' value={formData.phone} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <div className='w-full'>
                        <div className='text-2xl'>
                            <h2 className='inline-flex items-center gap-2 font-medium'>CART TOTALS</h2>
                        </div>
                        <div className='flex flex-col gap-2 mt-2 text-sm'>
                            <div className='flex justify-between'>
                                <p>Subtotal</p>
                                <p>₹{getCartAmount().toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <p>Shipping Fee</p>
                                <p>₹{delivery_fee.toFixed(2)}</p>
                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <b>Total</b>
                                <b>₹{getCartAmount() === 0 ? '0.00' : (getCartAmount() + delivery_fee).toFixed(2)}</b>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-12'>
                    <div className='inline-flex items-center gap-2 font-medium mb-3'>PAYMENT METHOD</div>
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
