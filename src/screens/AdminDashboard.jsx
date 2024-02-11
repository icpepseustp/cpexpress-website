import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { deletePost, postRef, updatePost } from "../api/FirebaseApi";
import { format } from "date-fns";
import Seo from "../components/Seo";
import tile_bg_3 from "../assets/images/tile-bg-3.png";

function AdminDashboard({ setAlert, setShowAlert }) {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    const q = query(
      postRef,
      where("approved", "==", filter),
      orderBy("created", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsub();
    };
  }, [filter]);

  const handleDelete = async (postId) => {
    await deletePost(postId);
    setAlert({
      type: "success",
      message: "Post has been deleted successfully.",
      duration: 3000,
    });
    setShowAlert(true);
  };

  const update_post = async (postId, type) => {
    await updatePost(postId, type).then((e) => {
      const msg1 = type === "approve" ? "approved" : "deleted";
      const msg2 = type === "approve" ? "approval" : "deletion";

      if (e) {
        toast.success(`Post has been ${msg1}.`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      } else {
        toast.error(`Post ${msg2} failed.`, {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    });
  };

  return (
    <div className="container lg:px-4 px-5 h-full w-full">
      <Seo title="Admin Dashboard | CpExpress" />

      <div className="flex flex-col items-center">
        <div
          className={`flex flex-col w-full ${
            posts.length > 0 ? "h-full" : "h-screen"
          } py-2 gap-y-2`}
        >
          <div className="flex flex-row w-full h-full gap-x-4 items-center my-4">
            <p className="text-white text-base">Filter: </p>
            <button
              onClick={() => setFilter(false)}
              className={`w-[80px] h-[28px] text-xs ${
                filter == false ? "border-border bg-[#1C3E97]" : "border-white"
              } border-[1px]  text-white rounded-md`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter(true)}
              className={`w-[80px] h-[28px] text-xs ${
                filter ? "border-border bg-[#1C3E97]" : "border-white"
              } border-[1px] text-white rounded-md`}
            >
              Approved
            </button>
          </div>
          <div className="w-full h-full lg:columns-4 columns-2 gap-x-2 pb-[300px]">
            {posts.map((post) => {
              return (
                <div
                  key={post.id}
                  className="posts-gradient-border relative w-full mb-2 rounded-[12px] overflow-hidden"
                >
                  <img
                    src={tile_bg_3}
                    className="z-[-10] w-full absolute object-cover "
                  />
                  <div className="flex flex-col text-white h-full w-full lg:px-5 p-4 lg:py-4">
                    <h1 className="font-josefin text-xl semi-bold">
                      {format(
                        new Date(post.data.created.toDate()),
                        "ccc, MMM dd"
                      )}
                    </h1>
                    <p className="text-sm font-dmsans py-2 text-white">
                      {post.data.body}
                    </p>
                    <div className="flex flex-row w-full mt-4 gap-x-2 items-center">
                      {filter == false && (
                        <button
                          onClick={() => update_post(post.id, "approve")}
                          className="w-[65px] h-[28px] text-xs border-white border-[1px] bg-[#1C3E97] text-white rounded-md"
                        >
                          Approve
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="w-[60px] h-[28px] text-xs border-white border-[1px] text-white rounded-md"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="h-10 w-full"></div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminDashboard;
