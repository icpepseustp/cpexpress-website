import { Cancel, Close, Send } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";

import spring from "../assets/images/spring.png";
import joebot from "../assets/images/icon.png";
import { format, formatDistance } from "date-fns";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateComment } from "../api/FirebaseApi";
import CircularProgress from "@mui/material/CircularProgress";

function PostComment({ post, close, userId }) {
  const [comment, setComment] = useState("");
  const [isUploading, setUploading] = useState(false);
  const [note, setNote] = useState(true);
  const [first, setFirst] = useState(true);
  const commentRef = useRef(null);

  const postComment = async (e) => {
    e.preventDefault();

    if (comment.length < 1) return;

    const temp = {
      content: comment,
    };

    setUploading(true);

    updateComment(post.id, userId, temp)
      .then((_) => {
        setUploading(false);
        setComment("");
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };

  const deleteComment = async (comment) => {
    updateComment(post.id, userId, null, comment)
      .then((_) => {
        setUploading(false);
        setComment("");
      })
      .catch((err) => {
        setUploading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (first) return setFirst(false);

    commentRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [post]);

  return (
    <div className="relative w-[450px] lg:h-[90%] h-[80%] text-[#CB2A6B] flex items-center mx-2">
      <img
        src="/images/pink-bg.png"
        className="z-[-1] w-full h-full absolute object-fit rounded-[20px]"
      />
      <div className="w-full h-full flex flex-col p-4 overflow-hidden">
        <div className="flex flex-row items-center justify-between select-none pb-2">
          <h1 className="font-dmserif text-xl">Post Comments</h1>
          <Cancel
            onClick={() => {
              close();
            }}
            className="cursor-pointer"
          />
        </div>
        <div className="flex flex-col h-full w-full overflow-auto">
          <div className="relative border border-transparent w-[80%] h-full self-center my-2">
            <div className="absolute top-0 flex w-full">
              <img
                src={spring}
                className="h-10 mx-auto items-center justify-center"
              />
            </div>
            <div className="bg-[#E8A48E]/50 w-full mb-2 rounded-[12px] mt-[14px] pt-4">
              <div className="flex flex-col text-[#CB2A6B] min-h-[150px] w-full lg:px-5 p-4 lg:py-4">
                <h1 className="font-dmserif text-xl semi-bold">
                  {post.data.title ??
                    format(new Date(post.data.created.toDate()), "ccc, MMM dd")}
                </h1>
                <p className="text-[#CB2A6B] font-dmsans py-2 flex-1">
                  {post.data.body}
                </p>
                <div className="w-full flex flex-row self-start mt-4 gap-x-3 items-center">
                  <div className="flex flex-row items-center gap-1">
                    {post.data.like.includes(userId) ? (
                      <FaHeart
                        onClick={() => {
                          updatePostLike(post.id, false);
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                    ) : (
                      <FaRegHeart
                        onClick={() => {
                          updatePostLike(post.id, true);
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                    )}
                    <p className="text-sm">{post.data.like.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full h-full flex flex-col pb-2 px-2">
            <p className="font-bold py-2">
              Comments &#x2022;{" "}
              <span className="text-sm font-bold">
                {post.data.comments.length}
              </span>
            </p>
            {note && (
              <div className="relative flex flex-row border border-[#CB2A6B] p-3 rounded-lg gap-2 items-center mb-2">
                <img src={joebot} className="w-[36px] h-[36px]" />
                <p className="text-sm leading-none">
                  <span className="font-bold">Reminder: </span>Comments are
                  unregulated. Please avoid harmful/offensive comments. Report
                  any issues to the admin immediately.
                </p>
                <div className="h-full mt-[-10px]">
                  <Close
                    onClick={() => {
                      setNote(false);
                    }}
                    fontSize="12px"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}
            <div className="flex flex-col gap-4 w-full px-2 py-2">
              {post.data.comments.map((item) => {
                const data = item[Object.keys(item)[0]];

                return (
                  <div className="w-full flex flex-row gap-2 items-start">
                    <div className="mt-1 w-8 h-8 ">
                      <img src={joebot} className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                      <div className="flex flex-row justify-between items-center bg-w">
                        <p className="text-sm font-bold flex flex-row items-center gap-2">
                          Anonymous
                          <span className="font-normal text-xs">
                            {formatDistance(data.created.toDate(), new Date(), {
                              addSuffix: true,
                            })}
                          </span>
                        </p>
                        {(data.uploader == userId || userId == "admin") && (
                          <div title="Delete comment">
                            <Close
                              onClick={() => {
                                deleteComment(item);
                              }}
                              className="cursor-pointer"
                              fontSize="inherit"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-sm leading-tight w-[90%]">
                        {data.content}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div ref={commentRef} />
        </div>
        <form
          onSubmit={postComment}
          className="flex flex-row h-14 items-center m-2 px-4 bg-[#E8A48E]/30 rounded-[8px]"
        >
          <input
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            placeholder="Write a comment..."
            className="w-full h-full bg-transparent focus:outline-none placeholder:text-[#CB2A6B]/50"
          />
          {isUploading ? (
            <CircularProgress color="inherit" size="20px" />
          ) : (
            <button type="submit">
              <Send
                className="cursor-pointer"
                style={{ color: comment.length < 1 ? "#e08da6" : "#CB2A6B" }}
              />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default PostComment;
