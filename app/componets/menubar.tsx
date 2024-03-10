'use client'
import React, { useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Newitems, Nuggets, Hits, Lavash, Doners, Burgers, Snacks, HotDrinks, Sauces, Salads, ColdDrinks } from '../utilities/data';
import Image from 'next/image';

const MenuBar = () => {
  const [selectedArray, setSelectedArray] = useState(Newitems);
  const [clickedBar, setClickedBar] = useState("New items");

  const handleSelectCategory = (category: string) => {
    switch (category) {
      case 'New items':
        setSelectedArray(Newitems);
        setClickedBar('New items');
        break;
      case 'Nuggets':
        setSelectedArray(Nuggets);
        setClickedBar('Nuggets');
        break;
      case 'Hits':
        setSelectedArray(Hits);
        setClickedBar('Hits');
        break;
      case 'Lavash':
        setSelectedArray(Lavash);
        setClickedBar('Lavash');
        break;
      case 'Doners':
        setSelectedArray(Doners);
        setClickedBar('Doners');
        break;
      case 'Burgers':
        setSelectedArray(Burgers);
        setClickedBar('Burgers');
        break;
      case 'Snacks':
        setSelectedArray(Snacks);
        setClickedBar('Snacks');
        break;
      case 'Hot drinks':
        setSelectedArray(HotDrinks);
        setClickedBar('Hot drinks');
        break;
      case 'Sauces':
        setSelectedArray(Sauces);
        setClickedBar('Sauces');
        break;
      case 'Salads':
        setSelectedArray(Salads);
        setClickedBar('Salads');
        break;
      case 'Cold drinks':
        setSelectedArray(ColdDrinks);
        setClickedBar('Cold drinks');
        break;
      default:
        setSelectedArray(Newitems);
        setClickedBar('New items');
    }
  };

  return (
    <main className='flex w-full h-full flex-col items-center justify-center'>
      {/* Top Bar */}
       <div className="flex md:hidden items-center justify-center w-full fixed bottom-[-7px] left-0 h-[60px] bg-black">
          <ul className="flex border-t justify-center items-center gap-5 h-[60px] shadow-lg bg-gradient-to-br from-purple-800 to-indigo-500 text-white">
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('New items')}>
                <span className={clickedBar === 'New items' ? 'selected' : 'list'}>New items</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Nuggets')} >
                  <span className={clickedBar === 'Nuggets' ? 'selected' : 'list'}>Nuggets</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Hits')}>
                <span className={clickedBar === 'Hits' ? 'selected' : 'list'}>Hits</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Lavash')}>
                <span className={clickedBar === 'Lavash' ? 'selected' : 'list'}>Lavash</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Doners')}>
                <span className={clickedBar === 'Doners' ? 'selected' : 'list'}>Doners</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Burgers')}>
                <span className={clickedBar === 'Burgers' ? 'selected' : 'list'}>Burgers</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Snacks')}>
                <span className={clickedBar === 'Snacks' ? 'selected' : 'list'}>Snacks</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Hot drinks')}>
                <span className={clickedBar === 'Hot drinks' ? 'selected' : 'list'}>Hot drinks</span>
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Sauces')}>
                <span className={clickedBar === 'Sauces' ? 'selected' : 'list'}>Sauces</span> 
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Salads')}>
                <span className={clickedBar === 'Salads' ? 'selected' : 'list'}>Salads</span> 
              </li>
              <li className='flex justify-center items-center' onClick={() => handleSelectCategory('Cold drinks')}>
                <span className={clickedBar === 'Cold drinks' ? 'selected' : 'list'}>Cold drinks</span> 
              </li>
          </ul>
        </div>

         <div className='flex gap-2'>
         {/* SideBar */}
          <div className="md:flex hidden h-[700px] w-full max-w-[200px] lg:max-w-[250px]">
           <div className="w-full flex flex-col p-4 shadow-lg bg-gradient-to-br from-purple-800 to-indigo-500 text-white">
            <span className="text-4xl font-bold mb-4">Menu</span>
            <ul className="w-full flex flex-col justify-center gap-3 mt-1">
              <li onClick={() => handleSelectCategory('New items')}>
                <span className={clickedBar === 'New items' ? 'selected' : 'list'}>New items</span>
              </li>
              <li onClick={() => handleSelectCategory('Nuggets')} >
                  <span className={clickedBar === 'Nuggets' ? 'selected' : 'list'}>Nuggets</span>
              </li>
              <li onClick={() => handleSelectCategory('Hits')}>
                <span className={clickedBar === 'Hits' ? 'selected' : 'list'}>Hits</span>
              </li>
              <li onClick={() => handleSelectCategory('Lavash')}>
                <span className={clickedBar === 'Lavash' ? 'selected' : 'list'}>Lavash</span>
              </li>
              <li onClick={() => handleSelectCategory('Doners')}>
                <span className={clickedBar === 'Doners' ? 'selected' : 'list'}>Doners</span>
              </li>
              <li onClick={() => handleSelectCategory('Burgers')}>
                <span className={clickedBar === 'Burgers' ? 'selected' : 'list'}>Burgers</span>
              </li>
              <li onClick={() => handleSelectCategory('Snacks')}>
                <span className={clickedBar === 'Snacks' ? 'selected' : 'list'}>Snacks</span>
              </li>
              <li onClick={() => handleSelectCategory('Hot drinks')}>
                <span className={clickedBar === 'Hot drinks' ? 'selected' : 'list'}>Hot drinks</span>
              </li>
              <li onClick={() => handleSelectCategory('Sauces')}>
                <span className={clickedBar === 'Sauces' ? 'selected' : 'list'}>Sauces</span> 
              </li>
              <li onClick={() => handleSelectCategory('Salads')}>
                <span className={clickedBar === 'Salads' ? 'selected' : 'list'}>Salads</span> 
              </li>
              <li onClick={() => handleSelectCategory('Cold drinks')}>
                <span className={clickedBar === 'Cold drinks' ? 'selected' : 'list'}>Cold drinks</span> 
              </li>
            </ul>
           </div>
           </div>
          <div className='flex flex-col mt-1 md:mt-0'>
            <div className='flex justify-center'><h1 className='font-bold text-4xl'>{clickedBar}</h1></div>
            <div className='xs:grid xs:grid-cols-2 lg:grid-cols-3 max-w-[1100px] flex flex-col justify-center items-center w-full gap-3 p-3 overflow-y-auto md:h-[640px] h-full mb-20 md:mb-0'>
              {selectedArray.map((item) => (
                <div key={item.id} className='p-3 bg-white rounded-3xl w-full max-w-[350px]'>
                  <Image className='w-full rounded-lg'
                    src={item.image} alt={item.title}
                    placeholder="blur"
                   /> 
                  <div className='pt-2 '>
                    <div className='space-y-[-10px]'>
                      <h3 className='text-xl font-bold text-black'>{item.title}</h3>
                      <h3 className='text-xl font-extrabold text-[#ff00e1]'>{item.sum}.000 <span className='text-white font-semibold'>sum</span></h3>
                    </div>
                    <div className='flex justify-between items-center mt-3'>
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
          </div>
        </div>
     </main>
   );
};

export default MenuBar;



//   return (
//     <main className='flex w-full h-full flex-col items-center justify-center overflow-hidden'>
//       {/* Top Bar */}
    
  
     
//     <div className='flex w-full justify-center items-center gap-2'>
//       {/* SideBar */}
//     <div className="lg:flex hidden h-[700px] w-full max-w-[250px] bg-gray-800 text-white">
//        <Sidebar handleSelectCategory={handleSelectCategory} />
//     </div>

//     <div className='h-[700px] xs:grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 max-w-[1100px] flex flex-col justify-center items-center w-full gap-4 p-4 overflow-y-auto'>
      
//       {selectedArray.map((item) => (
//         <div key={item.id} className='card rounded-3xl w-full max-w-[350px] h-full max-h-[380px]'>
//           <Image className='w-full rounded-lg' src={item.image} alt={item.title} />
//           <div className='pt-2'>
//             <div>
//               <h3 className='text-xl font-bold text-white'>{item.title}</h3>
//               <h3 className='text-xl font-extrabold text-[#ff00e1]'>{item.sum}.000 <span className='text-white font-semibold'>sum</span></h3>
//             </div>
//             <div className='flex justify-between items-center mt-3'>
//               <span className='text-green-500 font-semibold'>-10%</span>
//               <button className='bg-[#4b2971] border text-white rounded-full p-2 w-full max-w-[100px]'>
//                 Check
//               </button>
//               <div>
//                 <button className='bg-green-500 text-white rounded-full p-2'>
//                   <FaCartPlus size={20} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//     </div>

//     </main>
//   );
// };

// export default MenuBar;