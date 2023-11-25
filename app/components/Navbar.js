import React from 'react'
import Link from 'next/link'

const Navbar = () =>{
    return(
    <div className='h-20 w-full border-b-2 flex items-center justify-between p-2 bg-yellow-600'>
        <ul className='flex'>
            <li className='p-2 cursor-pointer'>
                <Link href='/'>Home</Link>
            </li>
            <li className='p-2 cursor-pointer'>
                <Link href='/about'>About</Link>
            </li>
            
        </ul>
        <div className="flex items-center">
            <img
                src="/ergobotHead.png"
                alt=""
                className="h-10 w-10 mr-3" 
            />
            <h1 className='font-bold text-2xl'>Ergobot</h1>
        </div>
    </div>
    )
}

export default Navbar