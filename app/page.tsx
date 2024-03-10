import React from 'react';
import Navbar from './componets/navbar';
import Menu from './componets/menu';
import Footer from './componets/footer';

const Home = () => {
  return (
    <div className=' flex flex-col w-full p-0 h-full overflow-hidden bg-black'>
      <Navbar />
      <div className='w-full h-full text-white pt-[80px] overflow-hidden'>
        <Menu />
        <div className='w-full hidden md:flex'>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;

