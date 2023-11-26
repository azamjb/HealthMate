import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='h-16 w-full flex items-center justify-between p-2 bg-amber-100 border-b border-black'>
            <Link href={'/'}>
                <div className="flex items-center">
                    <img
                        src="/ergobotHead.png"
                        alt=""
                        className="h-10 w-10 ml-6 mr-3"
                    />
                    <h1 className='font-bold text-2xl text-black'>Health Mate</h1>
                </div>
            </Link>

            <ul className='flex w-1/4 justify-between px-20 my-4'>
                <li className='font-bold text-black p-4 cursor-pointer hover:text-blue-400 hover:bg-amber-200 rounded transition ease-in duration-100'>
                    <Link href='/'>
                        <span>Home</span>
                    </Link>
                </li>

                <li className='font-bold text-black p-4 cursor-pointer hover:text-blue-400 hover:bg-amber-200 rounded ease-in duration-100'>
                    <Link href='/about'>
                        <span>About</span>
                    </Link>
                </li>
            </ul>

        </div>
    )
}

export default Navbar
