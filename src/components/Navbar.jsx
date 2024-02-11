import React from "react";
import { Link, useResolvedPath, useMatch, useNavigate } from "react-router-dom";
import logo from "../assets/images/icpepse-logo.png";
import { FaBars, FaTimes } from "react-icons/fa";

import { UserAuth } from "../auth/Auth";

export default function Navbar({ openNav, theme }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent">
        <div
          style={{ color: theme["color"]["text"] }}
          className={`container px-4 mx-auto flex flex-wrap items-center justify-between`}
        >
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase "
              href="/"
            >
              <img
                src={logo}
                className="lg:w-[80px] lg:h-[80px] w-[68px] h-[68px]"
              />
            </a>
            <button
              className="text-white cursor-pointer  text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => {
                openNav(!navbarOpen);
                setNavbarOpen(!navbarOpen);
              }}
            >
              {navbarOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          <div
            className={
              "relative lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
          >
            <ul
              onClick={() => {
                if (navbarOpen) {
                  openNav(!navbarOpen);
                  setNavbarOpen(!navbarOpen);
                }
              }}
              className=" flex flex-col lg:flex-row list-none lg:ml-auto w-full items-center min-w-max lg:w-min"
            >
              {user && (
                <CustomLinks to={"/admin"} theme={theme}>
                  Admin Dashboard
                </CustomLinks>
              )}
              <CustomLinks to={"/"} theme={theme}>
                Dashboard
              </CustomLinks>
              <CustomLinks to={"/how"} theme={theme}>
                How It Works
              </CustomLinks>
              {theme.id == 0 && (
                <CustomLinks to={"/contact"} theme={theme}>
                  Contact
                </CustomLinks>
              )}
              {user && (
                <button
                  onClick={async () => {
                    try {
                      await logout();
                      navigate("/login");
                    } catch (e) {
                      console.log(e.message);
                    }
                  }}
                  style={{ background: theme["color"]["button"] }}
                  className="w-[120px] h-[35px] rounded-lg text-white"
                >
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

function CustomLinks({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className="px-6 py-2 flex items-center">
      <Link to={to} {...props}>
        <div
          style={{
            borderColor: isActive
              ? props.theme["color"]["text"]
              : "transparent",
          }}
          className={`px-3 py-1 text-md border-b-2 lg:text-[16px] font-bold leading-snugtext-white `}
        >
          {children}
        </div>
      </Link>
    </li>
  );
}
