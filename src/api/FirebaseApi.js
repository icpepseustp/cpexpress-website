import { db } from "../../firebase";
import {
  doc,
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

const postRef = collection(db, "posts");

const addPost = async (userId, content) => {
  try {
    return await addDoc(postRef, {
      uploader: userId,
      title: content.title,
      body: content.body,
      approved: false,
      like: [],
      comments: [],
      created: Timestamp.now(),
    });
  } catch (err) {
    return false;
  }
};

const updateLike = (postId, like, userId) => {
  try {
    if (like) {
      updateDoc(doc(db, "posts", postId), { like: arrayUnion(userId) });
    } else {
      updateDoc(doc(db, "posts", postId), { like: arrayRemove(userId) });
    }
  } catch (err) {
    return false;
  }
};

const updateComment = async (postId, userId, comment, remove) => {
  const id = String(Date.now()).slice(5, 13);

  console.log(remove);
  if (comment) {
    return updateDoc(doc(db, "posts", postId), {
      comments: arrayUnion({
        [id]: {
          uploader: userId,
          content: comment.content,
          created: Timestamp.now(),
        },
      }),
    });
  }

  return updateDoc(doc(db, "posts", postId), {
    comments: arrayRemove(remove),
  });
};

const deletePost = async (postId) => {
  return deleteDoc(doc(db, "posts", postId));
};

const updatePost = async (postId, type) => {
  try {
    if (type === "approve") {
      await updateDoc(doc(db, "posts", postId), { approved: true });
      return true;
    } else if (type === "restore") {
      await updateDoc(doc(db, "posts", postId), { approved: false });
      return true;
    } else {
      await updateDoc(doc(db, "posts", postId), { approved: null });
      return true;
    }
  } catch (err) {
    return false;
  }
};

const getTheme = () => {
  return getDoc(doc(db, "website", "settings"));
};

export {
  addPost,
  postRef,
  updateLike,
  updatePost,
  deletePost,
  getTheme,
  updateComment,
};
