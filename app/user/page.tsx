'use client'
import React from 'react';
import OwnerUserdata from '../componets/owneruserdata';
import Link from 'next/link';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { ClimbingBoxLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import { auth } from '../firebase'
import { useRouter } from 'next/navigation';

const Page = () => {
  const { ownerUser, showSlowInternetMessage, isDownloading } = OwnerUserdata();
  const router = useRouter()

  const getDate = (timestamp: string | undefined) => {
    if (!timestamp) {
      return "Date not available";
    }
    const date = new Date(timestamp);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `You joined ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleSignOut = () => {
    auth.signOut();
    Cookies.remove('loggedin');
    router.push('/')
  };

  return (
   <div className="flex flex-col justify-center items-center w-full h-screen px-2 bg-black p-2 overflow-hidden">
      {ownerUser && 
        <div className="no-underline max-w-[500px] bg-slate-200 flex w-full rounded-t p-3 text-gray-500 cursor-pointer overflow-hidden">
          <Link href='/'>
            <IoMdArrowRoundBack className='hover:bg-slate-400 rounded-full' title='back' size={40} />
          </Link>  
          <h2 className="text-gray-500 text-xl font-bold ml-[100px]">User Profile</h2>
        </div>
      }

      {isDownloading && (
        <div className="flex justify-center items-center text-center w-full mt-4">
          <ClimbingBoxLoader color='#8800ff' size={50} loading={true} /> 
        </div>
      )}

      {showSlowInternetMessage && (
        <div className="text-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          <p className="font-medium text-lg mb-2">Internet Connection Issue</p>
          <p>Please check your connection and try again.</p>
        </div>
      )}

      <div className="flex w-full max-w-[500px] justify-center items-center">
        {ownerUser && (
          <div className="w-full max-w-[500px] h-[600px] bg-white shadow-md rounded-b">
            <div className="p-4 border-b">
              <h1 className="text-3xl font-bold mb-2 text-purple-800">{ownerUser.firstName} {ownerUser.lastName}</h1>
              <p className="text-gray-600 mb-2">{ownerUser.email}</p>
              <p className="text-gray-600 mb-2">{ownerUser.deliveryAddress ? ownerUser.deliveryAddress : "Location not specified"}</p>
            </div>

            <div className="p-4 border-b ">
              <p className="text-gray-600 text-2xl">{getDate(ownerUser.timestamp)}</p>
            </div>
            <div className="p-4 gap-3 border-b">
              <p className="text-gray-600 text-nowrap text-2xl">You have {ownerUser?.orders?.length} orders!</p>
               <Link className='no-underline text-2xl' href='/user/orders'>Check them out</Link>
            </div>

              <div className="flex justify-between items-center p-4">
                <Link href='/user/update-profile' className="w-full max-w-[150px] justify-center no-underline bg-[#8800ff] text-white rounded-full p-2 flex items-center hover:bg-purple-700 focus:outline-none">
                  Update Profile
                </Link>
                <button title='Log out' onClick={handleSignOut} className="text-white no-underline text-xl font-semibold flex justify-center items-center bg-red-600 w-full max-w-[100px] h-9 rounded-md">
                  Sign out
                </button>
              </div>
         </div>
        )}
      </div>
   </div>
  );
};

export default Page;