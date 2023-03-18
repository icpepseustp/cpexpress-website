import React from 'react'
import HashLoader from "react-spinners/HashLoader";

function Loader(props) {
  return (
    <div className='flex-col w-[320px] h-[250px] bg-white fixed rounded-[12px] shadow-lg'>
        <div className='flex flex-col w-full h-full items-center justify-center'>
            <HashLoader
                color="#1C3E97"
                loading
                speedMultiplier={1}
                className='mb-10'
            />
        <h1 className=''>{props.loading_msg}</h1>
        </div>
    </div>
  )
}

export default Loader