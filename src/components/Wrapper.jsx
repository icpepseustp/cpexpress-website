import React from "react";
import { Routes } from "react-router";
import Navbar from "./Navbar";
import background from "../assets/images/background.png";
import pinkBg from "../assets/images/pink-bg.png";
import { AuthContextProvider } from "../auth/Auth";

function Wrapper({ show, theme, openNav, children }) {
  return (
    <div
      className={`w-full relative ${show ? "h-full" : "h-screen"} font-dmsans`}
    >
      <img
        className="absolute w-full h-full z-[-10] "
        src={theme["background"]}
      />
      <AuthContextProvider>
        <Navbar theme={theme} openNav={openNav} />
        {show && <Routes>{children}</Routes>}
      </AuthContextProvider>
    </div>
  );
}

export default Wrapper;
