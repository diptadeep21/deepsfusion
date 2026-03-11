import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ShopContext } from './context/ShopContext'

const App = () => {

  const { token } = useContext(ShopContext);

  return (
    <div className='min-h-screen bg-gray-50'>
      <ToastContainer />
      {token === ""
        ? <Login />
        : <>
            <Navbar />
            <div className='flex w-full max-w-8xl mx-auto'>
              <Sidebar />
              <div className='flex-1 w-full min-h-[calc(100vh-64px)] bg-gray-50 p-4 sm:p-6 lg:p-8'>
                <Routes>
                  <Route path='/add' element={<Add />} />
                  <Route path='/list' element={<List />} />
                  <Route path='/orders' element={<Orders />} />
                </Routes>
              </div>
            </div>
          </>
      }
    </div>
  )
}

export default App

