'use client'
import React from 'react';
import OwnerUserdata from '../componets/owneruserdata';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ClimbingBoxLoader } from 'react-spinners';

const Page = () => {
  const { ownerUser, showSlowInternetMessage, isDownloading } = OwnerUserdata();


  const getDate = (timestamp: string | undefined) => {
    if (!timestamp) {
      return "Date not available";
    }
    const date = new Date(timestamp);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `Joined ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
  <div className="flex w-full flex-col justify-center max-w-2xl h-screen mx-auto px-2 bg-gray-100 p-2">
    
   {ownerUser && <div className="no-underline flex w-full border-b borderBg p-4 bg-black text-white cursor-pointer overflow-hidden ">
      <Link href='/'>
         <IoMdArrowRoundBack className='hover:bg-slate-800 rounded-full' title='back' size={40}/>
      </Link>  
      <h2 className="text-white text-xl font-bold ml-[100px] ">User profile</h2>
     </div>
    }
    
    {isDownloading && (
      <div className="flex flex-col justify-center items-center text-center gap-5 w-full">
        <ClimbingBoxLoader color='#8800ff' size={50} loading={true} /> 
      </div>
    )}
    {showSlowInternetMessage && (
      <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <p className="font-medium text-lg mb-2">Internet connection issue</p>
        <p>Please check your connection and try again.</p>
      </div>
    )}

     

    {ownerUser && (
      <div className="bg-white h-full shadow-md  mb-4">
        <div className="p-4 border-b">
          <h1 className="text-3xl font-bold mb-2 text-purple-800">{ownerUser.fullName}</h1>
          <p className="text-gray-600 mb-2">{ownerUser.email}</p>
          <p className="text-gray-600 mb-2">{ownerUser.deliveryAddress ? ownerUser.deliveryAddress : "Location not specified"}</p>
        </div>
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold mb-2">Card data:</h1>
          <p className="text-gray-600">{ownerUser.card || "Card not added"}</p>
        </div>
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold mb-2">Order History:</h1>
          {ownerUser.orders && ownerUser.orders.length > 0 ? (
            <ul className="list-disc pl-4">
              {ownerUser.orders.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>No order history available</p>
          )}
        </div>
        <div className="p-4">
          <p className="text-gray-600">{getDate(ownerUser.timestamp)}</p>
          <Link href='/user/update-profile'
            className="w-[200px] justify-center no-underline text-nowrap bg-[#8800ff] text-white rounded-full p-2 flex items-center mt-4 hover:bg-purple-700 focus:outline-none"
          >
            Update Profile
          </Link>
        </div>
      </div>
    )}
   </div>
  
  );
};

export default Page;