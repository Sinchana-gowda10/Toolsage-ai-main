import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { X, Menu } from 'lucide-react' // ✅ Fixed here
import SideBar from '../components/SideBar'
import {SignIn , useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser()

  return  user ? (
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='flex items-center justify-between w-full px-4 py-2 shadow-md'>
        <img 
          src={assets.logo} 
          alt="Logo" 
          onClick={() => navigate('/')} 
          className='h-10 cursor-pointer' 
        />
        {
  sidebar 
    ? <X 
        className='w-6 h-6 text-gray-600 sm:hidden' 
        onClick={() => setSidebar(false)} 
      />
    : <Menu 
        className='w-6 h-6 text-gray-600 sm:hidden' 
        onClick={() => setSidebar(true)} 
      />
}

      </nav>

      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
    <SideBar sidebar={sidebar} setSidebar={setSidebar} />
    <div className='flex-1 bg-[#F4F7FB]'>
        <Outlet />
    </div>
</div>

    </div>
  ) : (
   <div className='flex items-center justify-center h-screen'>

    <SignIn />
  </div>
  )
}

export default Layout
