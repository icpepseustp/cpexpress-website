import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { format } from "date-fns";
import {
  FaPlusCircle,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaComment,
  FaRegComment,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import Typed from "react-typed";
import { postRef, updateLike } from "../api/FirebaseApi";
import Seo from "../components/Seo";
import "react-toastify/dist/ReactToastify.css";
import { Backdrop } from "@mui/material";

import header from "../assets/images/title.png";
import heart_bg from "../assets/images/heart-bg.png";
import add_post from "../assets/images/add-post.png";
import spring from "../assets/images/spring.png";
import AddPost from "../components/AddPost";

function PinkDashboard() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();
  const [add, setAdd] = useState(false);

  var id = null;

  useEffect(() => {
    setMonth(format(Date.now(), "MMMM"));
    setDay(format(Date.now(), "dd"));
    getUserId();
  }, []);

  useEffect(() => {
    const q = query(
      postRef,
      where("approved", "==", true),
      orderBy("created", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      let data = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
      const size = 20;

      if (data.length < 1) return;

      data = Array.from({ length: Math.ceil(data.length / size) }, (v, i) =>
        data.slice(i * size, i * size + size)
      );

      setPosts(data[0]);
    });

    return () => {
      unsub();
    };
  }, []);

  const getUserId = () => {
    const user_id = localStorage.getItem("user-id");

    try {
      if (user_id) {
        id = JSON.parse(user_id);
        //setUserId(id);
      } else {
        const new_id = uuid().slice(0, 8);
        id = new_id;
        localStorage.setItem("user-id", JSON.stringify(id));
        //setUserId(id);
      }

      return id;
    } catch {
      console.log("error");
      return null;
    }
  };

  const updatePostLike = (postId, like) => {
    updateLike(postId, like, userId);
  };

  return (
    <>
      <Seo title="CpExpress | Confessions" />
      <div className="h-full w-full">
        <div className="flex flex-col items-center">
          <img src={header} className="lg:w-[45%] w-[60%] pt-4 mb-10" />
          <div className="my-4 relative w-full h-72">
            <div className="z-[-1] top-9 absolute w-full h-[222px] bg-[#E8A48E]/50"></div>
            <div className="flex flex-row w-full h-full px-14 gap-4">
              <div className="relative w-[300px] lg:h-full h-[140px]">
                <img
                  src={heart_bg}
                  className="z-[-1] w-full h-full absolute object-fit"
                />
                <div className="text-white flex flex-col px-14 py-12">
                  <h3 className="lg:text-2xl text-lg font-dmserif-italic lg:pb-2 pb-2 self-end">
                    Today Is...
                  </h3>
                  <h1 className="font-alexbrush lg:text-6xl text-2xl semi-bold self-center">
                    {month}
                  </h1>
                  <h1 className="font-alexbrush lg:text-8xl text-2xl semi-bold self-end">
                    {day}
                  </h1>
                </div>
              </div>
              <div className="text-[#CB2A6B] h-[222px] flex-1 flex flex-col px-10 mt-9 gap-4 justify-center">
                <h1 className="font-dmserif text-5xl">Happy Valentine’s Day</h1>
                <p className="font-dmserif-italic text-xl">
                  Share Your Deepest Romantic Confessions... Let Your Heart
                  Speak Freely On Our Valentine's Day Confession Wall.
                </p>
              </div>
              <div className="w-[250px]">
                <img
                  title="Add Post"
                  className="cursor-pointer"
                  src={add_post}
                  onClick={() => {
                    setAdd(true);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col w-full ${
              posts.length > 0 ? "h-full" : "h-screen"
            } py-2 gap-y-2`}
          >
            <div className="w-full h-full lg:columns-4 columns-2 gap-x-2 lg:px-14 py-6">
              {posts.map((post) => {
                return (
                  <div className="relative border border-transparent">
                    <div className="absolute top-0 flex w-full">
                      <img
                        src={spring}
                        className="h-10 mx-auto items-center justify-center"
                      />
                    </div>

                    <div
                      key={post.id}
                      className="bg-[#E8A48E]/50 w-full mb-2 rounded-[12px] h-full overflow-hidden mt-[14px] pt-4"
                    >
                      <div className="flex flex-col text-[#CB2A6B] min-h-[200px] w-full lg:px-5 p-4 lg:py-4">
                        <h1 className="font-dmserif text-2xl semi-bold">
                          {format(
                            new Date(post.data.created.toDate()),
                            "ccc, MMM dd"
                          )}
                        </h1>
                        <p className="text-[#CB2A6B] text-lg font-dmsans py-2 flex-1">
                          {post.data.body}
                        </p>
                        <div className="flex flex-row self-end mt-4 gap-x-3 items-center">
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
                          <div className="flex flex-row items-center gap-1 cursor-pointer">
                            <FaRegComment className="w-4 h-4 " />
                            <p className="text-sm">{0}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-10 w-full"></div>
          </div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={add}
          >
            <AddPost
              close={() => {
                setAdd(false);
              }}
            />
          </Backdrop>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default PinkDashboard;