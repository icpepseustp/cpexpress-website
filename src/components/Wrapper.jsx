import React from 'react'
import { Routes } from 'react-router'
import Navbar from './Navbar'
import background from '../assets/images/background.png'

function Wrapper({children, ...props}) {
  return (
    <div className={`relative ${props.show ? 'h-full':'h-screen' }`}>
        <img className='absolute w-full h-full object-cover z-[-10]' src={background}/>
          <Navbar openNav={props.openNav}/>       
          {
            props.show && 
            (<Routes>
              {children}
          </Routes>)
          }
    </div>
  )
}

export default Wrapper