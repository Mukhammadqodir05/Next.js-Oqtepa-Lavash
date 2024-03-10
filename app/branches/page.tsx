import React from 'react';
import branchData from '../utilities/branches';
import Footer from '../componets/footer';
import Navbar from '../componets/navbar';

const Branches = () => {
  return (
    <div className='flex flex-col w-full p-0 bg-black'>
      <Navbar />
      <div className="w-full h-full text-white pt-[100px] flex flex-col justify-center items-center overflow-y-auto">
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
        </div>
        <div className='mt-10 w-full'>
         <Footer />
        </div>
      </div>
    </div>
  );
}

export default Branches;

