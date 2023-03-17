import React, {useEffect, useState} from 'react'
import { v4 as uuid } from 'uuid';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { format} from 'date-fns'
import { FaPlusCircle, FaHeart, FaRegHeart } from "react-icons/fa"
import { ToastContainer } from 'react-toastify';
import { postRef, updateLike } from '../api/FirebaseApi';
import 'react-toastify/dist/ReactToastify.css';

import header from '../assets/images/welcome.png'
import tile_bg_1 from '../assets/images/tile-bg-1.png'
import tile_bg_2 from '../assets/images/tile-bg-2.png'
import tile_bg_3 from '../assets/images/tile-bg-3.png'

function Dashboard(props) {

  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState();

  var id = null;
  
  useEffect(() => {
    setMonth(format(Date.now(), 'MMM'));
    setDay(format(Date.now(), 'dd'));
    getUserId();
  }, []);

  useEffect(() => {

    const q = query(postRef, where('approved', '==', true), orderBy('created', 'desc'));

    const unsub = onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({id: doc.id, data: doc.data()})))
    })

    return () => {
      unsub()
    }
  }, []);

  const getUserId = () => {
    
    const user_id = localStorage.getItem('user-id');

    try{
      if(user_id){
        id = JSON.parse(user_id);
        setUserId(id);
      }else{
        const new_id = uuid().slice(0,8)
        id = new_id;
        localStorage.setItem('user-id', JSON.stringify(id));
        setUserId(id);
      }

      return id;
    }catch{
      console.log('error');
      return null;
    }
  }

  const updatePostLike = (postId, like) => {
    updateLike(postId, like, userId)
  }

  return (
    <>
     <div className='container px-4 h-full w-full'>
      <div className='flex flex-col items-center'>
      <img src={header} className='w-[60%] py-4'/>
      <div className={`flex flex-col w-full ${posts.length > 0 ? 'h-full' : 'h-screen'} py-2 gap-y-2`}>
        <div className='grid grid-cols-4 gap-x-2'>
          <div className='relative w-full h-[200px]'>
            <img src={tile_bg_1} className='z-[-10] w-full h-full absolute object-fit' /> 
            <div className='text-white flex flex-col items-center p-6'>
            <h3 className='text-xl font-dmsans pb-4'>Today is</h3>
            <h1 className='font-josefin text-5xl semi-bold'>
              {month}
            </h1>
            <h1 className='font-josefin text-5xl semi-bold'>
              {day}
            </h1>
            </div>
                  
          </div>
          <div className='relative w-full h-[200px]'>
            <img src={tile_bg_1} className='z-[-10] w-full h-full absolute object-fit' /> 
            <div className='text-white h-full flex flex-col items-center justify-center p-6'>
            <h3 className='text-4xl font-josefin text-center'>Welcome mga ka-CpE</h3>
            </div>
          </div>
          <div className='relative w-full h-[200px]'>
              <img src={tile_bg_1} className='z-[-10] w-full h-full absolute object-fit' /> 
              <div className='flex flex-col text-white h-full w-full px-5 py-4'>
                <h1 className='font-josefin text-2xl semi-bold'>
                  Tue, Feb 14
                </h1>
                <p className='font-[100] text-sm font-dmsans py-2'>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore</p>
              </div>
          </div>
          <div onClick={() => {
            if(userId){
              props.setId(userId)
              props.toggleModal()
            }
          }} className='cursor-pointer relative w-full h-[200px]'>
              <img src={tile_bg_2} className='z-[-10] w-full h-full absolute object-fit' /> 
              <div className='flex h-full w-full items-center justify-center'>
                <FaPlusCircle className='fill-white h-7 w-7'/>
              </div>
          </div>
        </div>
        <div className='w-full columns-4 gap-x-2'>
            {
              posts.map((post)=> { 
                return (
                  <div key={post.id} className='posts-gradient-border relative w-full mb-2 rounded-[12px] overflow-hidden'>
                    <img src={tile_bg_3} className='z-[-10] w-full absolute object-cover ' /> 
                    <div className='flex flex-col text-white h-full w-full px-5 py-4'>
                      <h1 className='font-josefin text-xl semi-bold'>
                        {format(new Date(post.data.created.toDate()), 'ccc, MMM dd')}
                      </h1>
                      <p className='font-[100] text-sm font-dmsans py-2'>{post.data.body}</p>
                      <div className='flex flex-row w-full mt-4 gap-x-2 items-center'>
                        {
                          post.data.like.includes(userId) ? 
                          (<FaHeart onClick={() => {updatePostLike(post.id, false)}} className='w-4 h-4 cursor-pointer'/>) 
                          : (<FaRegHeart onClick={() => {updatePostLike(post.id, true)}} className='w-4 h-4 cursor-pointer'/>)
                        }
                        <p className='text-white text-sm'>{post.data.like.length}</p>
                      </div>
                    </div>
                  </div>
                );  
            })
            }
        </div>
        <div className='h-10 w-full'></div>
      </div>
      <ToastContainer/>
      </div>
      
    </div>
    </>
  )
}

export default Dashboard