'use client'
import React from 'react';
import OwnerUserdata from '@/app/componets/owneruserdata';
import { PulseLoader } from 'react-spinners';
import Navbar from '../../componets/navbar';

const Page = () => {
  const { ownerUser } = OwnerUserdata();

  return (
    <>
      {ownerUser ? (
        <main className="flex flex-col items-center justify-center h-screen bg-black  text-white p-1 overflow-hidden">
          <Navbar />
           <div className="flex flex-col justify-center items-center max-w-[800px] w-full h-[750px] mt-14">
           {ownerUser.orders.length > 0 && <h1 className="text-3xl font-bold mb-6 gradient-text">Your Orders</h1>}
            <div className='flex flex-col max-w-[450px] h-[560px] overflow-y-auto'>
            {ownerUser.orders.length > 0 ?
            (ownerUser?.orders?.map((order, index) => (
              <div key={index} className="mb-6 border-1 border-gray-600 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h2 className="text-lg font-semibold">Order ID: {order.id}</h2>
                    <p className="text-sm text-gray-400">Order Time: {order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Card Number: {order.cardNumber}</p>
                    <p className="text-sm text-gray-400">Expiry Date: {order.expiryDate}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Delivery Address: {order.deliverAddress}</p>
                  <p className="text-[#ffffff]">Total Sum: {order.totalSum}.000 sum</p>
                  <p className="text-white">Delivery Fee: {order.deliveryFee}</p>
                </div>
              </div>
            )))
            : (
              <div className='flex justify-center items-center w-full h-[600px]'>
                <h1 className='text-3xl font-bold gradient-text'>You have no orders yet!</h1>
              </div>
            )
            }
           </div>
          </div>
        </main>
      ) : (
        <div className="flex h-screen justify-center items-center w-full bg-black">
          <PulseLoader color="#8800ff" size={50} loading={true} />
        </div>
      )}
    </>
  );
};

export default Page;
