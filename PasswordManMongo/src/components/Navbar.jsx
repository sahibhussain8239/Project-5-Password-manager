import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-green-950 text-white'>
            <div className='mycontainer flex justify-between items-center px-4 h-14 py-5'>
                <div className='logo font-bold text-2xl'>
                    <span className='text-green-700'>&lt;</span>
                    Password
                    <span className='text-green-700'>Man/&gt;</span>
                </div>
                <button className='bg-green-900  rounded-lg py-1 flex items-center px-1 ring-white ring-1'>
                    <img src="github.svg" alt="" />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
