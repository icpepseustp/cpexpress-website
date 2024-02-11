import React from "react";
import Seo from "../components/Seo";
import ContactText from "../assets/images/contact-text.png";
import ContactText2 from "../assets/images/contact-text-2.png";
import tile_bg_1 from "../assets/images/tile-bg-1.png";
import contact_tile from "../assets/images/contact-tile.png";
import contact_tile_2 from "../assets/images/contact-tile-2.png";
import joebot from "../assets/images/joebot.png";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Contact() {
  return (
    <main className="lg:px-12 lg:h-screen h-full w-full">
      <Seo title="Contact | CpExpress" />

      <section className="flex flex-col lg:flex-row items-center justify-center gap-y-8 pb-8">
        <div className="flex items-center justify-center">
          <img
            className="lg:flex hidden shrink lg:w-[68%] w-[48%]"
            src={ContactText}
            alt="contact-text"
          />
          <img
            className="lg:hidden shrink lg:w-[68%] w-[70%]"
            src={ContactText2}
            alt="contact-text"
          />
        </div>
        <div className="lg:w-[65%] grid grid-cols-1 lg:grid-cols-2 gap-x-2 gap-y-4 px-8">
          <div className="relative w-full lg:h-[420px]">
            <img
              src={tile_bg_1}
              className="z-[-10] w-full h-full absolute object-fit"
            />
            <div className="h-full flex flex-col items-center justify-center p-6 gap-y-4">
              <div
                href={`mailto:icpepse@ustp.edu.ph`}
                className="relative w-full lg:h-[52px] cursor-pointer"
              >
                <img
                  src={contact_tile}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="h-full w-full flex flex-row items-center p-6">
                  <FaEnvelope className="fill-white w-5 h-5" />
                  <div className="w-full">
                    <p className="text-white text-center underline">
                      icpepse@ustp.edu.ph
                    </p>
                  </div>
                </div>
              </div>

              <div
                href={`tel:09762875041`}
                className="relative w-full lg:h-[52px] cursor-pointer"
              >
                <img
                  src={contact_tile}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="h-full w-full flex flex-row items-center p-6">
                  <FaPhoneAlt className="fill-white w-5 h-5" />
                  <div className="w-full">
                    <p className="text-white text-center underline">
                      (+63) 976-287-5041
                    </p>
                  </div>
                </div>
              </div>

              <div
                href={`https://www.facebook.com/icpep.se.ustp`}
                className="relative w-full lg:h-[52px] cursor-pointer"
              >
                <img
                  src={contact_tile}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="h-full w-full flex flex-row items-center p-6">
                  <FaFacebook className="fill-white w-5 h-5" />
                  <div className="w-full">
                    <p className="text-white text-center underline">
                      icpep.se.ustp
                    </p>
                  </div>
                </div>
              </div>

              <div
                href={`https://www.instagram.com/ustp_icpep_se `}
                className="relative w-full lg:h-[52px] cursor-pointer"
              >
                <img
                  src={contact_tile}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="h-full w-full flex flex-row items-center p-6">
                  <FaInstagram className="fill-white w-5 h-5" />
                  <div className="w-full">
                    <p className="text-white text-center underline">
                      @ustp_icpep_se
                    </p>
                  </div>
                </div>
              </div>

              <div
                href={`https://twitter.com/ustp_icpepse`}
                className="relative w-full lg:h-[52px] cursor-pointer"
              >
                <img
                  src={contact_tile}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="h-full w-full flex flex-row items-center p-6">
                  <FaTwitter className="fill-white w-5 h-5" />
                  <div className="w-full">
                    <p className="text-white text-center underline">
                      @ustp_icpepse
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full lg:h-[420px]">
            <img
              src={tile_bg_1}
              className="z-[-10] w-full h-full absolute object-fit"
            />
            <div className="h-full flex flex-col items-center justify-center p-6">
              <h1 className="text-white text-xl font-semibold lg:mb-8 mb-2">
                Find Us
              </h1>
              <div
                href={`https://twitter.com/ustp_icpepse`}
                className="relative w-full lg:h-[95px] cursor-pointer"
              >
                <img
                  src={contact_tile_2}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="h-full w-full flex flex-row items-center p-6">
                  <FaMapMarkerAlt className="fill-white w-6 h-6" />
                  <div className="w-full px-4">
                    <p className="text-white">
                      C.M. Recto Avenue Lapasan 9000 Cagayan de Oro, Philippines
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center h-full w-full py-2">
                <img className="w-[140px] h-[140px]" src={joebot} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
