import React from 'react'
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../assets/images/icpepse-logo.png'
import { FaBars, FaTimes } from "react-icons/fa"

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
      <>
        <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent">
          <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
              <a
                className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                href="/"
              >
                <img src={logo} className='w-[80px] h-[80px]' />
              </a>
              <button
                className="text-white cursor-pointer  text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                {navbarOpen ? <FaTimes/> : <FaBars/>}
              </button>
            </div>
            <div
              className={
                "relative lg:flex flex-grow items-center" +
                (navbarOpen ? " flex" : " hidden")
              }
            >
              
              <ul className=" flex flex-col lg:flex-row list-none lg:ml-auto w-full items-center min-w-max lg:w-min">
                <CustomLinks to={'/'}>Dashboard</CustomLinks>
                <CustomLinks to={'/how'}>How It Works</CustomLinks>
                <CustomLinks to={'/contact'}>Contact</CustomLinks>
              </ul>
           
            </div>
          </div>
        </nav>
      </>
    );
  }

  function CustomLinks({ to, children, ...props }){

    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li
            className='px-6 py-2 flex items-center'
        >
            <Link to={to} {...props}>
                <div className={`px-3 py-1 text-md text-white lg:text-[16px] font-bold leading-snugtext-white ${isActive ? 'border-b-2' : 'border-b-0'}`}>
                {children}
                </div>
            </Link>
        </li>
    );
  }