import React from 'react';
import Navbar from './pages/navbar';
import Menu from './pages/menu';

const Home = () => {
  return (
    <div className='flex w-full p-0 h-full overflow-hidden'>
      <Navbar />
       <div className='w-full h-full bg-black text-white pt-[80px]'>
         <Menu />
       </div>
    </div>
  );
};

export default Home;
