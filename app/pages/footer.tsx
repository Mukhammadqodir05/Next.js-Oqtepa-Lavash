import React from 'react';
import Logo from '../pages/logo';

const Footer = () => {
  return (
    <footer className="flex w-full bg-black border-t borderColor text-white py-3 text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className='cursor-pointer'>
         <Logo />
        </div>
        <p className="text-xl">© 2024 Oqtepa Lavash. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

