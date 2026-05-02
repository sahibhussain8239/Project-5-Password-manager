import React from 'react'

const Footer = () => {
    return (
        <div className='bg-green-950 text-white flex justify-center items-center flex-col bottom-0 w-full'>
            <div className='logo font-bold text-2xl'>
                <span className='text-green-700'>&lt;</span>
                Password
                <span className='text-green-700'>Man/&gt;</span>
            </div>
            <div className='flex items-center'>
                Created with <lord-icon
                    src="https://cdn.lordicon.com/bgtwmaiu.json"
                    trigger="hover">
                </lord-icon> By Sahib Hussain
            </div>
        </div>
    )
}

export default Footer
