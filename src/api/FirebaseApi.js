import { db } from '../../firebase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'

const addPost = async (userId, content) => {

  console.log(userId)
  console.log(content)
   try {
     return await addDoc(collection(db, 'posts'), {
       uploader: userId,
       body: content,
       approved: false,
       like: [],
       created: Timestamp.now()
     })
   } catch (err) {
     return false;
   }
}

export { addPost }