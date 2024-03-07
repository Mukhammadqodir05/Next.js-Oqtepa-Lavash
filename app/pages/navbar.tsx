'use client'
import React, { useState }  from 'react';
import Link from 'next/link';
import { FaListUl } from "react-icons/fa6";
import { VscAccount } from "react-icons/vsc";
import { MdClose } from "react-icons/md";
import Logo from './logo';

const Navbar = () => {
  const[isNavOpen, setIsNavOpen] = useState(false)
  const handleNavbar = () => {
    setIsNavOpen((prev) => !prev)
  }

  return (
    <nav className="flex w-full navbar p-0 items-center justify-between border-b borderColor text-white fixed-top h-[80px]">
      <div className='ml-5 md:ml-10'>
        <Logo />
      </div>
      <div className="hidden md:flex md:items-center md:gap-6 mr-10">
      <Link href="/" className="text-white no-underline text-xl font-semibold">Home</Link>
            <Link href="/branches" className="text-white no-underline text-xl font-semibold">Branches</Link>
            <Link href="/about" className="text-white no-underline text-xl font-semibold">About</Link>
            <Link href="/contact" className="text-white no-underline text-xl font-semibold">Contact</Link>
        <button className=' text-[#4f69ff]'><VscAccount size={40} /></button>
      </div>

      <div className="flex items-center md:hidden mr-3">
        <button className="text-white">
         <FaListUl onClick={handleNavbar} size={30}/>
        </button>
      </div>
      
      {isNavOpen && (
        <div className='md:hidden fixed top-0 left-0 w-full h-screen bg-black bg-opacity-80 z-50 transform transition-transform duration-300 ease-in-out p-1 '>
          <div className='flex items-center w-full justify-between'>
           <div className='ml-4 mt-[1px] cursor-pointer'>
              <Logo />
           </div>
           <div className='mr-2 cursor-pointer hover:bg-[#595959] rounded-full p-1'>
              <MdClose title='close' onClick={handleNavbar} size={30}/>
            </div>
          </div>
          <ul className="flex flex-col justify-start gap-6 mt-6">
            <Link href="/" className="text-white cursor-pointer no-underline text-xl font-semibold">Home</Link>
            <Link href="/branches" className="text-white cursor-pointer no-underline text-xl font-semibold">Branches</Link>
            <Link href="/about" className="text-white cursor-pointer no-underline text-xl font-semibold">About</Link>
            <Link href="/contact" className="text-white cursor-pointer no-underline text-xl font-semibold">Contact</Link>
            <div className='flex gap-2'>
              <h4 className='text-xl cursor-pointer'>Sign up</h4>
              <button className='text-[#4f69ff] cursor-pointer'><VscAccount size={30} /></button>
            </div>
          </ul>
        </div>
      )}

    </nav>
  );
};

export default Navbar;



