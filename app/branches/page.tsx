import React from 'react';
import branchData from '../utilities/branches';
import Footer from '../componets/footer';
import Navbar from '../componets/navbar';
import aboutImage from '/public/About/aboutImage.jpg';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';

const Branches = () => {
  return (
   <div className='flex flex-col w-full p-0 bg-black'>
    <Navbar />
     <div className="flex flex-col w-full min-h-screen bg-black text-white">
      <div className="w-full flex flex-col items-center justify-center h-full pt-16 overflow-y-auto">
        <div className="w-full max-w-[1000px] flex flex-col items-center justify-center mt-12 p-2">
          <Image
            src={aboutImage}
            alt="About Oqtepa Lavash company"
            className="rounded-lg shadow-lg"
            placeholder='blur'
          />
        </div>
        <div className="w-full max-w-[1000px] mt-8 p-2">
          <h1 className="text-3xl font-bold text-white mb-4">Welcome to Oqtepa Lavash</h1>
          <p className="text-lg text-gray-300 leading-relaxed">
            Oqtepa Lavash is a well-known fast food establishment specializing in serving delicious and authentic fast foods. Our goal is to offer customers top-quality, freshly prepared fast food bursting with flavor and satisfaction.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            Oqtepa Lavash, a chain of fast food cafes, thrives in Uzbekistan's rapidly expanding market by catering to the demand for accessible fast food options. Our dedication to food excellence is evident—from introducing more balanced pita bread options to preparing fresh cheeseburgers upon order. We continuously demonstrate our commitment to both our customers and our culinary creations.
            Our journey commenced over 12 years ago when two brothers embarked on realizing their longstanding aspiration: to excel in the realm of catering, particularly in the art of Lavash preparation. In 2010, the inaugural Oqtepa Lavash branch came to life. Today, over 55 fast food cafes dot the landscape of Uzbekistan, providing employment opportunities for more than 1,500 individuals.
          </p>
        </div>
      </div>
    </div>
      <div className="w-full h-full text-white pt-[10px] flex flex-col justify-center items-center overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 gradient-text">Our Branches</h1>
        <div className="flex flex-col items-center lg:grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-7xl mx-auto px-4 z-10 relative">
          {branchData.map((branch) => (
            <div key={branch.id} className="box_color gradient-border rounded-lg p-4 h-full max-h-[300px] w-full max-w-[700px] ">
              <h2 className="text-xl font-bold mb-2">{branch.title}</h2>
              <p>location: {branch.location}</p>
              <p>Close Time: {branch.closeTime}</p>
              <p>Schedule: {branch.schedule}</p>
            </div>
          ))}
          <div className="flex flex-col w-full max-w-[1000px] justify-center ml-5">
            <div className="flex items-center">
              <FaMapMarkerAlt size={24} className="mr-2" />
              <p className="text-md text-gray-400 mt-3">Tashkent, Almazar district, Karasaray Street, 2a.</p>
            </div>
            <div className="flex items-center">
              <FaPhone size={24} className=" text-[#f00] mr-2" />
              <p className="text-md text-gray-400 mt-3">+998 78 150 00 30</p>
            </div>
          </div>
          </div>
         <div className='mt-10 w-full'>
         <Footer />
        </div>
      </div>
    </div>
  );
}

export default Branches;

