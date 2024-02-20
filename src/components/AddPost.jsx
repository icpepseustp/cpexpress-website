import { Cancel, Image } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";
import { addPost } from "../api/FirebaseApi";

function AddPost({ close, userId, setAlert, setShowAlert, theme }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isUploading, setUploading] = useState(false);

  const handleClose = () => {
    close();
    setTitle("");
    setBody("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setUploading(true);

    const content = {
      title: title,
      body: body,
    };

    addPost(userId, content)
      .then((_) => {
        setUploading(false);
        setAlert({
          type: "info",
          message:
            "Your post has been uploaded successfully. Please wait for the admin approval.",
          duration: 5000,
        });
        setShowAlert(true);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
        setAlert({
          type: "error",
          message: "Something went wrong. Please try again.",
          duration: 3000,
        });
        setShowAlert(true);
      });
  };

  return (
    <div
      style={{
        backgroundColor: theme["modal"]["bg"],
        color: theme["modal"]["font"],
      }}
      className="relative w-[500px] h-[450px] rounded-[20px] mx-4 text-[#CB2A6B]"
    >
      {isUploading && (
        <div
          style={{
            backgroundColor: theme["modal"]["bg"],
            opacity: "50%",
          }}
          className="absolute w-full h-full  rounded-[20px] flex flex-col gap-4 items-center justify-center"
        >
          <CircularProgress color="inherit" size="42px" />
          <p>Uploading, please wait...</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full h-full flex flex-col py-4 px-6"
      >
        <div className="flex flex-row items-center justify-between select-none">
          <h1
            style={{ fontFamily: theme["fonts"]["title"] }}
            className="text-2xl"
          >
            Speak Your Mind
          </h1>
          <Cancel
            onClick={() => {
              handleClose();
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col py-4 px-1">
          <input
            required
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              const size = e.target.value.length;
              if (size > 30) return;
              setTitle(e.target.value);
            }}
            style={{ borderColor: theme["modal"]["font"] }}
            className="py-1 focus:outline-none bg-transparent border-b text-xl border-[#CB2A6B]"
          />
          <p className="self-end py-2 font-bold text-sm">{title.length}/30</p>
          <textarea
            required
            placeholder="Say something..."
            rows={8}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            className="pt-2 bg-transparent resize-none  text-lg focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center justify-end px-1">
          {/* <div className="flex flex-row items-center gap-2 select-none cursor-pointer">
            <Image />
            <p className="text-sm font-bold">Add Photo</p>
          </div> */}
          <button
            type="submit"
            style={{ backgroundColor: theme["color"]["button"] }}
            className="select-none w-[100px] h-9 rounded-[10px] bg-[#CB2A6B] text-white text-sm font-bold"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
