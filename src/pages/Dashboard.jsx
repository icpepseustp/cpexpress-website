import React, {useEffect, useState} from 'react'
import { v4 as uuid } from 'uuid';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { format} from 'date-fns'
import { FaPlusCircle, FaHeart, FaRegHeart } from "react-icons/fa"
import { ToastContainer } from 'react-toastify';
import Typed from 'react-typed';
import { postRef, updateLike } from '../api/FirebaseApi';
import Seo from '../components/Seo';
import 'react-toastify/dist/ReactToastify.css';

import header from '../assets/images/welcome.png'
import tile_bg_1 from '../assets/images/tile-bg-1.png'
import tile_bg_2 from '../assets/images/tile-bg-2.png'
import tile_bg_3 from '../assets/images/tile-bg-3.png'
import joebot from '../assets/images/joebot.png'

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
    {/* <Seo title="CpExpress" /> */}
    <div className='container lg:px-4 px-5 h-full w-full'>     
      <div className='flex flex-col items-center'>
      <img src={header} className='lg:w-[60%] w-[90%] pt-4 pb-6'/>
      <div className={`flex flex-col w-full ${posts.length > 0 ? 'h-full' : 'h-screen'} py-2 gap-y-2`}>
        <div className='grid lg:grid-cols-4 grid-cols-2 gap-x-2 gap-y-2'>
          <div className='relative w-full lg:h-[200px] h-[140px]'>
            <img src={tile_bg_1} className='z-[-10] w-full h-full absolute object-fit' /> 
            <div className='text-white flex flex-col items-center p-6'>
            <h3 className='lg:text-xl text-base font-dmsans lg:pb-4 pb-2'>Today is</h3>
            <h1 className='font-josefin lg:text-5xl text-2xl semi-bold'>
              {month}
            </h1>
            <h1 className='font-josefin lg:text-5xl text-2xl semi-bold'>
              {day}
            </h1>
            </div>
                  
          </div>
          <div className='relative w-full lg:h-[200px] h-[140px]'>
            <img src={tile_bg_1} className='z-[-10] w-full h-full absolute object-fit' /> 
            <div className='text-white h-full flex flex-col items-center justify-center p-6'>
            <h3 className='lg:text-4xl text-1xl font-josefin text-center'>Welcome mga ka-CpE</h3>
            </div>
          </div>
          <div className='relative w-full lg:h-[200px] h-[140px]'>
              <img src={tile_bg_1} className='z-[-10] w-full h-full absolute object-fit' /> 
              <div className='flex flex-row text-white h-full w-full lg:px-5 px-4 lg:py-11 py-5 lg:gap-x-4 gap-x-2'>
               <img src={joebot} className='lg:flex hidden lg:w-[100px] lg:h-[100px] w-[60px] h-[60px] self-center'/>
               <div className='w-full overflow-hidden'>
               <Typed
                className='font-josefin lg:text-xl text-base'
                strings={[
                    '^1000Feel free to express yourself and share what your mind says.^2000',
                    '^1000Let your voice be heard and spread positivity and kindness.^2000',
                    ]}
                    typeSpeed={50}
                    backSpeed={40}
                    loop />
               </div>
              </div>
          </div>
          <div onClick={() => {
            if(userId){
              props.setId(userId)
              props.toggleModal()
            }
          }} className='cursor-pointer relative w-full lg:h-[200px] h-[140px]'>
              <img src={tile_bg_2} className='z-[-10] w-full h-full absolute object-fit' /> 
              <div className='flex h-full w-full items-center justify-center'>
                <FaPlusCircle className='fill-white h-7 w-7'/>
              </div>
          </div>
        </div>
        <div className='w-full h-full lg:columns-4 columns-2 gap-x-2'>
            {
              posts.map((post)=> { 
                return (
                  <div key={post.id} className='posts-gradient-border relative w-full mb-2 rounded-[12px] overflow-hidden'>
                    <img src={tile_bg_3} className='z-[-10] w-full absolute object-cover ' /> 
                    <div className='flex flex-col text-white h-full w-full lg:px-5 p-4 lg:py-4'>
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