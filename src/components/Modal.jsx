import React, { useState, useEffect } from 'react'
import { FaRegTimesCircle } from "react-icons/fa"
import { addPost } from '../api/FirebaseApi'
import Loader from './Loader';

function Modal(props) {

  const [content, setContent] = useState('');
  const [valid, setValid] = useState(false);

  const [userId, setUserId] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserId(props.userId);
  }, [userId]);

  const handleSubmit =  async (e) => {
    e.preventDefault();

    if(valid){
      setLoading(true)
      const timeout = setTimeout(async () => {
        await addPost(userId, content).then((e) => {
          if(e){
            setLoading(false)
            setContent('')
            props.toggleModal()
            props.showSuccess('Yay! post was uploaded, but it needs admin approval before it can be shown on the dashboard.')
          }else{
            setLoading(false)
            props.showError('Oh no, an error occurred, please try to submit your post again.')
          }
        }) 
      }, 3000)
  
      return () => clearTimeout(timeout)
      
    }
      
  }

  useEffect(() => {
    setValid(content.length > 0 ? true : false);
  }, [content]);
 
  return (
    <div className='absolute z-[100] w-full h-full'>
        <div className='absolute w-full h-full z-[-200] opacity-50 bg-[#000000] '></div>
        <div className='flex justify-center items-center h-screen w-full z-[100] '>
          { !loading ? (<form onSubmit={handleSubmit} className='flex-col w-[320px] h-[420px] bg-white fixed rounded-[12px] shadow-lg'>
              <div className='relative flex justify-between px-3 items-center h-[50px] bg-gradient-to-bl from-[#102F67] to-[#2E55E0] rounded-t-[12px] shadow-md'>
                <p className='text-white'>Create your post</p>
                <FaRegTimesCircle className='w-5 h-5 fill-white cursor-pointer' onClick={props.toggleModal}/>
              </div>
              <div className='w-full h-[300px] p-3'>
                <textarea 
                  className='w-full h-full resize-none outline-none' 
                  name="posts" 
                  placeholder='Speak your mind...' 
                  value={content}
                  onChange={
                    (e) => {
                      setContent(e.target.value); 
                    }
                   }/>
              </div>
              <div className='flex justify-end px-4 h-[60px] items-center'>
                <button type={`${valid ? 'submit' : 'none'}`} className= {`${valid ? 'text-white bg-[#1C3E97]' : 'text-white/80 bg-[#1C3E97]/80 cursor-auto'}  w-[80px] h-[28px] rounded-[8px]`}>Submit</button>
              </div>
              </form>) : (
                <Loader loading_msg='Uploading post, please wait...' />
              )
          }
        </div>
    </div>
  )
}

export default Modal