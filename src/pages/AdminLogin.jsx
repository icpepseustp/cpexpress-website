import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../auth/Auth";
import { toast, ToastContainer } from 'react-toastify'

import tile_bg_1 from '../assets/images/tile-bg-1.png'

function AdminLogin() {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState("");
const [valid, setValid] = useState(false);

const navigate = useNavigate();
const { signIn } = UserAuth();

const handleSubmit =  async (e) => {
    e.preventDefault();

    if(valid){
        const process = new Promise(async (resolve, reject) => {
            try {
                await signIn(email, password);
                setTimeout(navigate("/admin-ds"), 2000);
                resolve();
              } catch (e) {
                setError(e.message)
                reject(e.message);
              }
        })

        toast.promise(
           process,
            {
              pending: 'Logging in, please wait...',
              success: 'Logged in successfully.',
              error: {error}
            }
        )
        
    }
  }

  useEffect(() => {
    setValid(email.length > 0 && password.length > 0 ? true : false);
  }, [email, password]);

  return (
    <div className='h-screen w-full px-8'>
        <div className='flex flex-row h-[400px]'>
            <div className='w-1/2 px-4 flex flex-col justify-center items-center'>
                <h1 className='text-white text-6xl ml-16'>
                    This is where the magic happens!
                </h1>
            </div>
            <div className='w-1/2 h-full flex flex-col justify-center items-center'>
                <div className='relative w-[350px] h-[300px]'>
                <img src={tile_bg_1} className='z-[-10] w-full h-full absolute object-fit' /> 
                    <div className='flex flex-col py-4 px-10 font-dmsans text-white '>
                        <h1 className='text-center text-xl mb-3'>Admin Login</h1>
                        <form onSubmit={handleSubmit}>
                            <label className='block pt-2 pb-1'>Email Address</label>
                            <input value={email}
                            onChange={
                                (e) => {
                                setEmail(e.target.value); 
                                }
                            } 
                            className='text-black w-full h-8 outline-none px-2 rounded-[6px]' type='text'></input>
                            <label className='block pt-2 pb-1'>Password</label>
                            <input value={password}
                            onChange={
                              (e) => {
                                setPassword(e.target.value); 
                              }
                             }
                            className='text-black w-full h-8 outline-none px-2 rounded-[6px]' type='password'></input>
                            <button type={`${valid ? 'submit' : 'none'}`} className={`h-[35px] w-full mt-6 text-center ${valid ? 'text-white bg-[#1C3E97]' : 'text-white/80 bg-[#1C3E97]/80 cursor-auto'} rounded-[6px]`}>LOGIN</button>
                        </form>
                        
                    </div>
                    
                </div>
            </div>
        </div>
        <ToastContainer 
        position="bottom-right"
        autoClose={3000}/>
    </div>
  )
}

export default AdminLogin