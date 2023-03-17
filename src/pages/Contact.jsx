import React from 'react'
import ContactText from "../assets/images/contact-text.png";
import BG from "../assets/images/contact-bg.png"
import Email from "../assets/images/contact-email.png"
import Phone from "../assets/images/contact-phone.png"
import Fb from "../assets/images/contact-fb.png"
import Ig from "../assets/images/contact-ig.png"
import Twt from "../assets/images/contact-twt.png"
import Loc from "../assets/images/contact-loc.png"

function Contact() {
  return (
    <main className='lg:px-12 h-screen w-full'>
      <section className="flex flex-col lg:flex-row items-center justify-center">

        <img className="shrink w-[20%] h-[20%] lg:h-[20%] lg:w-[20%] mr-20" src={ContactText} alt="contact-text"/>

        <div className="flex flex-col gap-7 bg-red">
          <div>
            <div href={`mailto:icpepse@ustp.edu.ph`}>
              <img className="lg:flex hidden w-[25%] lg:w-[75%]"src={Email}alt="email.png"/>
            </div>
          </div>

          <div>
            <p href={`tel:09762875041`}>
              <img className="lg:flex hidden w-[25%] lg:w-[75%]"src={Phone}alt="phone.png"/>
            </p>
          </div>

          <div>
            <p href={`https://www.facebook.com/icpep.se.ustp`}>
              <img className="lg:flex hidden w-[25%] lg:w-[75%]"src={Fb}alt="fb.png"/>
            </p>
          </div>

          <div>
            <p href={`https://www.instagram.com/ustp_icpep_se `}>
              <img className="lg:flex hidden w-[25%] lg:w-[75%]"src={Ig}alt="ig.png"/>
            </p>
          </div>

          <div>
            <p href={`https://twitter.com/ustp_icpepse`}>
              <img className="lg:flex hidden w-[25%] lg:w-[75%]"src={Twt}alt="twt.png"/>
            </p>
          </div>
        </div>

        <img className="shrink w-[30%] h-[30%] lg:h-[30%] lg:w-[30%] mr-20" src={Loc} alt="loc.png"/>

      </section>
    </main>
  )
}

export default Contact