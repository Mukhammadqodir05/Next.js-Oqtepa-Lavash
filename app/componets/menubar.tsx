'use client'
import React, { useEffect, useRef, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { Newitems, Nuggets, Hits, Lavash, Doners, Burgers, Snacks, HotDrinks, Sauces, Salads, ColdDrinks } from '../utilities/data';
import Image from 'next/image';
import Categories from '../utilities/categories';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const MenuBar = () => {
  const [selectedArray, setSelectedArray] = useState(Newitems);
  const [clickedBar, setClickedBar] = useState("New items");
  const [isLeftVisible, setIsLeftVisible] = useState(false)
  const [isRightVisible, setIsRightVisible] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

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

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
            left: scrollContainerRef.current.scrollLeft - 100,
            behavior: 'smooth'
        });
        setIsRightVisible(true);
        if (scrollContainerRef.current.scrollLeft <= 100) {
            setIsLeftVisible(false);
        } else {
            setIsLeftVisible(true);
        }
    }
  };

  const handleScrollRight = () => {
      if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
              left: scrollContainerRef.current.scrollLeft + 100,
              behavior: 'smooth'
          });
          setIsLeftVisible(true);
          if (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth <= scrollContainerRef.current.scrollLeft + 100) {
              setIsRightVisible(false);
          } else {
              setIsRightVisible(true);
          }
      }
  };

  return (
    <main className='flex w-full h-full flex-col items-center justify-center'>
      {/* Bottombar */}
        <div className='flex md:hidden w-full fixed border-t borderColor bg-black bottom-0 left-0 right-0 overflow-x-hidden items-center'>
          { isLeftVisible &&
            <div className='flex p-2 items-center absolute text-white left-0 bottom-0 pr-4 w-20 h-full bg-gradient-to-r from-black from-60% to-transparent'>
              <SlArrowLeft onClick={handleScrollLeft} className='cursor-pointer' size={20} />
            </div>
          }
          <div className="flex h-16 pl-5 w-full overflow-x-hidden">
            <div ref={scrollContainerRef} className="flex gap-2 justify-between items-center text-white h-full overflow-x-auto" style={{ display: 'flex' }}>
              {Categories.map((category) => (
                <div className='flex justify-center items-center w-full' key={category} onClick={() => handleSelectCategory(category)}>
                  <span className={clickedBar === category ? 'selectedBottomBar' : 'BottomBarList'}>{category}</span>
                </div>
              ))}
              <div className='flex pl-3 w-full'></div> 
            </div>
          </div>

          { isRightVisible &&
            <div className='flex items-center absolute text-white right-0 p-2 bottom-0 bg-gradient-to-l justify-end from-black from-60% to-transparent w-20 h-full'>
              <SlArrowRight onClick={handleScrollRight} className='cursor-pointer' size={20} />
            </div>
          }
          </div>
          
          <div className='flex gap-2'>
          {/* Sidebar */}
            <div className="md:flex hidden h-[700px] w-full max-w-[200px] lg:max-w-[250px]">
              <div className="w-full flex flex-col p-4 shadow-lg bg-gradient-to-br from-purple-800 to-indigo-500 text-white">
                <span className="text-4xl font-bold mb-4">Menu</span>
                <ul className="w-full flex flex-col justify-center gap-3 mt-1">
                  {Categories.map((category) => (
                    <li key={category} onClick={() => handleSelectCategory(category)}>
                      <span className={clickedBar === category ? 'selected' : 'list'}>{category}</span>
                    </li>
                  ))}
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
                        <h3 className='text-xl font-bold text-black'>{item.title}</h3>
                        <h3 className='text-xl font-extrabold text-[#ff00e1]'>{item.sum}.000 <span className='text-white font-semibold'>sum</span></h3>
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



