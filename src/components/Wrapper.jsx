import React from 'react'
import { Routes } from 'react-router'
import Navbar from './Navbar'
import background from '../assets/images/background.png'
import { AuthContextProvider } from "../auth/Auth";

function Wrapper({children, ...props}) {
  return (
    <div className={`relative ${props.show ? 'h-full':'h-screen' }`}>
        <img className='absolute w-full h-full object-cover z-[-10]' src={background}/>
          <AuthContextProvider>
            <Navbar openNav={props.openNav}/>       
            {
              props.show && 
              (
                <Routes>
                  {children}
                </Routes>
              
              )
            }
          </AuthContextProvider>
    </div>
  )
}

export default Wrapper