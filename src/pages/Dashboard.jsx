import React, {useEffect, useState} from 'react'
import header from '../assets/images/welcome.png'
import tile_bg_1 from '../assets/images/tile-bg-1.png'
import tile_bg_2 from '../assets/images/tile-bg-2.png'
import tile_bg_3 from '../assets/images/tile-bg-3.png'
import joebot from '../assets/images/joebot.png'
import { format} from 'date-fns'
import { FaPlusCircle, FaHeart } from "react-icons/fa"
import posts from '../assets/sample-data.json'

function Dashboard() {

  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    
    setMonth(format(Date.now(), 'MMM'));
    setDay(format(Date.now(), 'dd'));
  }, []);

  return (
    <div className='container px-4 h-full w-full'>
      <div className='flex flex-col items-center'>
      <img src={header} className='w-[60%] py-4'/>
      <div className='flex flex-col w-full py-2 gap-y-2'>
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
          <div className='relative w-full h-[200px]'>
              <img src={tile_bg_2} className='z-[-10] w-full h-full absolute object-fit' /> 
              <div className='flex h-full w-full items-center justify-center'>
                <FaPlusCircle className='fill-white h-7 w-7'/>
              </div>
          </div>
        </div>
        <div className='w-full columns-4 gap-x-2'>
            {
              posts.map((post)=>{  
                return (
                  <div className='posts-gradient-border relative w-full mb-2 rounded-[12px] overflow-hidden'>
                    <img src={tile_bg_3} className='z-[-10] w-full absolute object-cover ' /> 
                    <div className='flex flex-col text-white h-full w-full px-5 py-4'>
                      <h1 className='font-josefin text-2xl semi-bold'>
                        {post.date}
                      </h1>
                      <p className='font-[100] text-sm font-dmsans py-2'>{post.body}</p>
                    </div>
                  </div>
                );  
            })
            }
        </div>
        <div className='h-10 w-full'></div>
      </div>
      
      </div>
      
    </div>
  )
}

export default Dashboard