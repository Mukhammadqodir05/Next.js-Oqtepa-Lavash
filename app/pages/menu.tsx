import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import Newitems from '../utilities/data';
import Image from 'next/image';

const Menu = () => {
  return (
    <main className='flex w-full h-full flex-col items-center justify-center '>
      <div className='xs:grid flex flex-col justify-center items-center w-full grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4'>
        { Newitems.map((item) => (
          <div key={item.id} className='card rounded-3xl w-full max-w-[400px] h-full max-h-[400px]'>
            <Image className='w-full rounded-lg' src={item.image} alt={item.title} />
            <div className='pt-2'>
              <div>
                <h3 className='text-xl font-bold text-white'>{item.title}</h3>
                <h3 className='text-xl font-extrabold text-[#ff00e1]'>{item.sum}.000 <span className='text-white font-semibold'>sum</span></h3>
              </div>
              <div className='flex justify-between items-center mt-5 sm:mt-0'>
                <span className='text-green-500 font-semibold'>-10%</span>
                <button className='bg-[#4b2971] border text-white rounded-full p-2 w-full max-w-[100px]'>
                  Check
                </button>
                <div>
                  <button className='bg-green-500 text-white rounded-full p-2'>
                    <FaCartPlus size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Menu;



