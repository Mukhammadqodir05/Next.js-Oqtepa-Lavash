import React from 'react';
import Navbar from '../pages/navbar';
import Footer from '../pages/footer';
import { FaPhone, FaTelegram } from 'react-icons/fa';
import Image from 'next/image';
import oqtepalavashcontact from '/public/oqtepalavashcontact.jpg';

const Contact = () => {
  
  return (
    <div className="flex flex-col items-center justify-center pt-20 bg-black text-white">
      <Navbar />
      <div className="flex flex-col justify-center items-center w-full text-center h-screen pt-5 p-2">
        <h1 className="text-5xl font-bold mb-8 gradient-text lg:mt-5">Get in Touch</h1>
        <div className="w-full max-w-[700px]">
          <Image
            src={oqtepalavashcontact}
            alt="About Oqtepa Lavash company"
            className='rounded-lg border'
          />
        </div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 mt-12 md:mt-20">
          <div className="bg-gray-800 border p-4 rounded-lg flex items-center">
            <FaPhone size={25} className="cursor-pointer text-[#f00] mr-4" />
            <div>
              <p className="text-lg md:text-xl text-gray-300">
                Contact us at our office number:
              </p>
              <p className="text-lg text-red-400 font-bold">+998 78 150 00 30</p>
            </div>
          </div>
          <div className="bg-gray-800 border p-4 rounded-lg flex items-center">
            <FaTelegram size={30} className="cursor-pointer text-[#0088cc] mr-4" />
            <div>
              <p className="text-lg text-gray-300">
                Connect with us through our bot:
              </p>
              <p className="text-lg text-blue-400 font-bold">t.me/oqtepalavash_bot</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10 w-full'>
         <Footer />
        </div>
    </div>
  );
};

export default Contact;





