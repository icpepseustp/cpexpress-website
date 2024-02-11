import React from "react";

import Navbar from "./Navbar";
import background from "../assets/images/background.png";
import pinkBg from "../assets/images/pink-bg.png";

function Wrapper({ show, theme, openNav, children }) {
  return (
    <div className={`relative w-full h-full font-dmsans`}>
      <img
        className="fixed w-full h-screen z-[-10]"
        src={theme["background"]}
      />
      <Navbar theme={theme} openNav={openNav} />
      {show && children}
    </div>
  );
}

export default Wrapper;
