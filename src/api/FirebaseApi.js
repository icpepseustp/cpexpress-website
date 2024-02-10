import { db } from '../../firebase'
import { 
  doc, 
  collection, 
  addDoc, 
  Timestamp, 
  updateDoc, 
  arrayUnion, 
  arrayRemove, 
  getDoc,
  deleteDoc} from 'firebase/firestore'

const postRef = collection(db, 'posts');

const addPost = async (userId, content) => {
   try {
     return await addDoc(postRef, {
       uploader: userId,
       title: content.title,
       body: content.body,
       approved: false,
       like: [],
       comments: [],
       created: Timestamp.now()
     })
   } catch (err) {
     return false;
   }
}

const updateLike = (postId, like, userId) => {
  try{
    if(like){
      updateDoc(doc(db, 'posts', postId), { like: arrayUnion(userId)})
    }else{
      updateDoc(doc(db, 'posts', postId), { like: arrayRemove(userId)})
    }
  } catch(err){
    return false;
  }
}

const deletePost = async (postId) => {
  return deleteDoc(doc(db, 'posts', postId));
}

const updatePost = async (postId, type) => {
  try{
    if(type === 'approve'){
      await updateDoc(doc(db, 'posts', postId), { approved : true})
      return true;
    } else if(type === 'restore'){
      await updateDoc(doc(db, 'posts', postId), { approved : false})
      return true;
    }
    else{
      await updateDoc(doc(db, 'posts', postId), { approved : null})
      return true;
    }
  } catch(err){
    return false;
  }
}

const getTheme = () => {
  return getDoc(doc(db, "website", "settings"));
}

export { 
  addPost, 
  postRef, 
  updateLike, 
  updatePost,
  deletePost,
  getTheme
}