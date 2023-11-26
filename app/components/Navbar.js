import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='bg-zinc-900 h-16 w-full border-b border-slate-200 border-white flex items-center justify-between p-2'>
            <div className="flex items-center">
                <img
                    src="/ergobotHead.png"
                    alt=""
                    className="h-10 w-10 ml-6 mr-3"
                />
                <h1 className='font-bold text-2xl'>Ergobot</h1>
            </div>

            <ul className='flex w-1/4 justify-between px-20 my-4'>
                <li className='p-4 cursor-pointer hover:text-slate-500 hover:bg-black rounded transition ease-in-out'>
                    <Link href='/'>Home</Link>
                </li>

                <li className='p-4 cursor-pointer hover:text-slate-500 hover:bg-black rounded transition ease-in-out'>
                    <Link href='/about'>About</Link>
                </li>
            </ul>

        </div>
    )
}

export default Navbar