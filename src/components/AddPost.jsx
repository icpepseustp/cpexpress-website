import { Cancel, Image } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useState } from "react";

function AddPost({ close }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isUploading, setUploading] = useState(false);

  const handleClose = () => {
    close();
    setTitle("");
    setBody("");
  };

  return (
    <div className="relative w-[500px] h-[450px] bg-[#EFC3BB] rounded-[20px] mx-4 text-[#CB2A6B]">
      {isUploading && (
        <div className="absolute w-full h-full bg-[#EFC3BB]/50 rounded-[20px] flex flex-col gap-4 items-center justify-center">
          <CircularProgress color="inherit" size="42px" />
          <p>Uploading, please wait...</p>
        </div>
      )}
      <div className="w-full h-full flex flex-col py-4 px-6">
        <div className="flex flex-row items-center justify-between select-none">
          <h1 className="font-dmserif text-2xl">Speak Your Mind</h1>
          <Cancel
            onClick={() => {
              handleClose();
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col py-4 px-1">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => {
              const size = e.target.value.length;
              if (size > 30) return;
              setTitle(e.target.value);
            }}
            className="py-1 focus:outline-none bg-transparent border-b text-xl placeholder:text-[#CB2A6B]/50 border-[#CB2A6B]"
          />
          <p className="self-end py-2 font-bold text-sm">{title.length}/30</p>
          <textarea
            placeholder="Say something..."
            rows={8}
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
            className="pt-2 bg-transparent resize-none placeholder:text-[#CB2A6B]/50 text-lg focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center justify-end px-1">
          {/* <div className="flex flex-row items-center gap-2 select-none cursor-pointer">
            <Image />
            <p className="text-sm font-bold">Add Photo</p>
          </div> */}
          <button className="select-none w-[100px] h-9 rounded-[10px] bg-[#CB2A6B] text-white text-sm font-bold">
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
