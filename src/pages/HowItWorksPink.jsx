import React from "react";
import Seo from "../components/Seo";
import ComeAndSharePink from "../assets/images/come-share-pink.png";
import add_post from "../assets/images/icons/add-post.png";
import create_post from "../assets/images/icons/create-post.png";
import upload_post from "../assets/images/icons/upload-post.png";
import approval from "../assets/images/icons/approval.png";
import reminders from "../assets/images/icons/reminders.png";

function HowItWorksPink({ theme }) {
  return (
    <div className="container text-[#CB2A6B] w-full lg:h-[550px] flex flex-col lg:flex-row gap-y-8 gap-x-14 items-center px-4 lg:px-8 pb-8">
      <Seo title="How It Works | CpExpress" />
      <div className="lg:my-4 lg:max-w-max">
        <img
          className="lg:flex hidden"
          src={ComeAndSharePink}
          alt="come-share.png"
        />
        <h1 className="flex lg:hidden w-[100%] text-3xl font-dmserif text-center self-center px-4">
          Come And Share Your Thoughts And Experiences Anonymously On Our
          Freedom Wall
        </h1>
      </div>
      <div className="h-full lg:w-[80%] w-full bg-[#E8A48E]/50 flex flex-col p-6 rounded-[20px]">
        <h1>
          ICpEP.SE - USTP aims to provide a safe space for students to
          anonymously express their thoughts and concerns about their academics
          and overall college experience. All the posts are filtered out to
          avoid any inappropriate or vulgar confessions, ensuring that the
          messages displayed are appropriate for a public space.
        </h1>
        <h1 className="font-bold py-4">How to use this platform:</h1>
        <div className="grid lg:grid-cols-2 grid-flow-cols-1 gap-4">
          <div className="flex flex-row gap-2 items-center">
            <img
              src={add_post}
              className="h-12 w-12 shadow-md rounded-[10px]"
            />
            <div className="flex flex-col text-sm">
              <label className="font-bold ">Click Add Post Button</label>
              <p>To add your confession to the wall.</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <img
              src={upload_post}
              className="h-12 w-12 shadow-md rounded-[10px]"
            />
            <div className="flex flex-col text-sm">
              <label className="font-bold ">Upload Your Post</label>
              <p>If you are set, click the Post button.</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <img
              src={create_post}
              className="h-12 w-12 shadow-md rounded-[10px]"
            />
            <div className="flex flex-col text-sm">
              <label className="font-bold ">Create Your Post</label>
              <p>Add a Title and a content to your post. </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center w-full">
            <img
              src={approval}
              className="h-12 w-12 shadow-md rounded-[10px]"
            />
            <div className="flex flex-col text-sm w-[80%]">
              <label className="font-bold ">Admin Approval</label>
              <p className="leading-none">
                Please wait for the Admin to approve your post.
              </p>
            </div>
          </div>
        </div>
        <h1 className="font-bold py-4">Platform Reminders:</h1>
        <div className="flex flex-row lg:gap-4 gap-2 pb-2">
          <img
            src={reminders}
            className="lg:h-16 lg:w-16 w-14 h-14 shadow-md rounded-[10px]"
          />
          <div className="flex flex-col w-[85%] gap-2">
            <div className="flex flex-row gap-2 leading-none text-sm">
              <span>&#x2022;</span>
              <p>
                Please be vigilant in your use of words and punctuation. Posts
                containing profanity or malice will not be approved.
              </p>
            </div>
            <div className="flex flex-row gap-2 leading-none text-sm">
              <span>&#x2022;</span>
              <p>
                Post comments are unregulated. Please avoid harmful/offensive
                comments. Report any issues to the Admin immediately.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorksPink;
