import React from 'react';
import Navbar from './pages/navbar';
import Menu from './pages/menu';
import Footer from './pages/footer';

const Home = () => {
  return (
    <div className='flex w-full p-0 h-full overflow-hidden'>
      <Navbar />
       <div className='w-full h-full bg-black text-white pt-[80px]'>
         <Menu />
         <Menu />

         <div className='mt-10 w-full'>
         <Footer />
        </div>
       </div>

    </div>
  );
};

export default Home;
