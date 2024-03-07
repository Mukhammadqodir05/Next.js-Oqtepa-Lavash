import React from 'react';
import Logo from '../pages/logo';

const Footer = () => {
  return (
    <footer className="flex w-full bg-black border-t borderColor text-white py-3 text-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex gap-2 items-center">
          <Logo />
          <p className="text-sm">© 2024 Oqtepa Lavash. All Rights Reserved.</p>
        </div>
        <div className="text-sm mt-2 md:mt-0">
          <h5 className="text-gray-400">Tashkent, Almazar district, st. Karasay, 2a</h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

