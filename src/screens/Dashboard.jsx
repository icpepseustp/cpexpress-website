import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { format } from "date-fns";
import {
  FaPlusCircle,
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegTrashAlt,
} from "react-icons/fa";
import { Backdrop } from "@mui/material";
import Typed from "react-typed";
import { deletePost, postRef, updateLike } from "../api/FirebaseApi";
import Seo from "../components/Seo";
import "react-toastify/dist/ReactToastify.css";

import header from "../assets/images/welcome.png";
import tile_bg_1 from "../assets/images/tile-bg-1.png";
import tile_bg_2 from "../assets/images/tile-bg-2.png";
import tile_bg_3 from "../assets/images/tile-bg-3.png";
import joebot from "../assets/images/joebot.png";
import ShowDialog from "../components/ShowDialog";
import AddPost from "../components/AddPost";
import PostComment from "../components/PostComment";

function Dashboard({ userId, setAlert, setShowAlert, user, theme }) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [posts, setPosts] = useState([]);
  const [deleteDialog, setDelete] = useState(null);
  const [comments, setComments] = useState(null);
  const [add, setAdd] = useState(false);

  useEffect(() => {
    setMonth(format(Date.now(), "MMM"));
    setDay(format(Date.now(), "dd"));
  }, []);

  useEffect(() => {
    const start = new Date("2024-02-13");
    start.setHours(0, 0, 0, 0);

    const q = query(
      postRef,
      where("created", ">", start),
      where("approved", "==", true),
      orderBy("created", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsub();
    };
  }, []);

  const updatePostLike = (postId, like) => {
    updateLike(postId, like, userId);
  };

  const handleDelete = async (postId) => {
    await deletePost(deleteDialog);
    setAlert({
      type: "success",
      message: "Post has been deleted successfully.",
      duration: 3000,
    });
    setShowAlert(true);
  };

  return (
    <>
      <Seo title="CpExpress" />
      <div className="container lg:px-4 px-5 h-full w-full">
        <div className="flex flex-col items-center">
          <img src={header} className="lg:w-[60%] w-[90%] pt-4 pb-6" />
          <div
            className={`flex flex-col w-full ${
              posts.length > 0 ? "h-full" : "h-screen"
            } py-2 gap-y-2`}
          >
            <div className="grid lg:grid-cols-4 grid-cols-2 gap-x-2 gap-y-2">
              <div className="relative w-full lg:h-[200px] h-[140px]">
                <img
                  src={tile_bg_1}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="text-white flex flex-col items-center p-6">
                  <h3 className="lg:text-xl text-base font-dmsans lg:pb-4 pb-2">
                    Today is
                  </h3>
                  <h1 className="font-josefin lg:text-5xl text-2xl semi-bold">
                    {month}
                  </h1>
                  <h1 className="font-josefin lg:text-5xl text-2xl semi-bold">
                    {day}
                  </h1>
                </div>
              </div>
              <div className="relative w-full lg:h-[200px] h-[140px]">
                <img
                  src={tile_bg_1}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="text-white h-full flex flex-col items-center justify-center p-6">
                  <h3 className="lg:text-4xl text-1xl font-josefin text-center">
                    Welcome mga ka-CpE
                  </h3>
                </div>
              </div>
              <div className="relative w-full lg:h-[200px] h-[140px]">
                <img
                  src={tile_bg_1}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="flex flex-row text-white h-full w-full lg:px-5 px-4 lg:py-11 py-5 lg:gap-x-4 gap-x-2">
                  <img
                    src={joebot}
                    className="lg:flex hidden lg:w-[100px] lg:h-[100px] w-[60px] h-[60px] self-center"
                  />
                  <div className="w-full overflow-hidden">
                    <Typed
                      className="font-josefin lg:text-xl text-base"
                      strings={[
                        "^1000Feel free to express yourself and share what your mind says.^2000",
                        "^1000Let your voice be heard and spread positivity and kindness.^2000",
                      ]}
                      typeSpeed={50}
                      backSpeed={40}
                      loop
                    />
                  </div>
                </div>
              </div>
              <div
                onClick={() => {
                  setAdd(true);
                }}
                className="cursor-pointer relative w-full lg:h-[200px] h-[140px]"
              >
                <img
                  src={tile_bg_2}
                  className="z-[-10] w-full h-full absolute object-fit"
                />
                <div className="flex h-full w-full items-center justify-center">
                  <FaPlusCircle className="fill-white h-7 w-7" />
                </div>
              </div>
            </div>
            <div className="w-full h-full lg:columns-4 columns-2 gap-x-2">
              {posts.map((post) => {
                return (
                  <div
                    key={post.id}
                    className="posts-gradient-border relative w-full mb-2 rounded-[12px] overflow-hidden"
                  >
                    <img
                      src={tile_bg_3}
                      className="z-[-10] w-full h-full absolute object-fit"
                    />
                    <div className="flex flex-col text-white h-full w-full lg:px-5 p-4 lg:py-4">
                      <h1 className="font-josefin lg:text-xl text-lg semi-bold">
                        {post.data.title ??
                          format(
                            new Date(post.data.created.toDate()),
                            "ccc, MMM dd"
                          )}
                      </h1>
                      <p className="text-sm font-dmsans py-2">
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
                        {/* <div
                          onClick={() => {
                            if (!post.data.comments) return;
                            setComments(post);
                          }}
                          className="flex flex-row items-center gap-1 cursor-pointer"
                        >
                          <FaRegComment className="w-4 h-4 " />
                          <p className="text-sm">
                            {!post.data.comments
                              ? 0
                              : post.data.comments.length}
                          </p>
                        </div> */}
                        {(post.data.uploader == userId || !!user) && (
                          <div className="w-full flex justify-end">
                            <FaRegTrashAlt
                              onClick={() => {
                                setDelete(post.id);
                              }}
                              className="cursor-pointer w-4 h-4 self-end"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-10 w-full"></div>
          </div>
          <ShowDialog
            title={"Delete Post"}
            description={`Are you sure you want to delete this post?`}
            open={!!deleteDialog}
            close={() => {
              setDelete(null);
            }}
            callback={() => {
              handleDelete(deleteDialog);
            }}
          />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={add}
          >
            <AddPost
              close={() => {
                setAdd(false);
              }}
              userId={userId}
              setAlert={setAlert}
              setShowAlert={setShowAlert}
              theme={theme}
            />
          </Backdrop>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!!comments}
          >
            {!!comments && (
              <PostComment
                close={() => {
                  setComments(null);
                }}
                post={comments}
                userId={userId}
              />
            )}
          </Backdrop>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
