import React from 'react'
import { Routes } from 'react-router'
import Navbar from './Navbar'
import background from '../assets/images/background.png'

function Wrapper({children}) {
  return (
    <div className='relative'>
        <img className='absolute w-full h-full object-cover z-[-10]' src={background}/>
          <Navbar />       
          <Routes>
              {children}
          </Routes>
    </div>
  )
}

export default Wrapper