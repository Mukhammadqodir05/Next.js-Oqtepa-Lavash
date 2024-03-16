'use client'
import React, { useRef, useState } from 'react';
import { Newitems, Nuggets, Hits, Lavash, Doners, Burgers, Snacks, HotDrinks, Sauces, ColdDrinks } from '../utilities/data';
import Image, { StaticImageData } from 'next/image';
import Categories from '../utilities/categories';
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdAddShoppingCart, MdClose } from 'react-icons/md';
import { useSelectedItemStore } from '../store/selectedItemStore';
import AddToCard from './addToCard';
import { FadeLoader, PuffLoader } from 'react-spinners';
import OwnerUserdata from './owneruserdata';
import Link from 'next/link';

type ItemType = {
  id: number;
  image: StaticImageData;
  sum: number;
  title: string;
  promoItems: string,
  description: string;
};

const MenuBar = () => {
  const [selectedArray, setSelectedArray] = useState(Newitems);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);  
  const [clickedBar, setClickedBar] = useState("New items");
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { setSelectedStoreItem } = useSelectedItemStore();
  const { handleAddToCart, loading, isItemVisible, setIsItemVisible } = AddToCard()
  const { ownerUser } = OwnerUserdata();

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
            left: scrollContainerRef.current.scrollLeft - 150,
            behavior: 'smooth'
        });
        setIsRightVisible(true);
        if (scrollContainerRef.current.scrollLeft <= 150) {
            setIsLeftVisible(false);
        } else {
            setIsLeftVisible(true);
        }
    }
  };

  const handleScrollRight = () => {
      if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
              left: scrollContainerRef.current.scrollLeft + 150,
              behavior: 'smooth'
          });
          setIsLeftVisible(true);
          if (scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth <= scrollContainerRef.current.scrollLeft + 150) {
              setIsRightVisible(false);
          } else {
              setIsRightVisible(true);
          }
      }
  };

  return (
    <>
    { ownerUser ?
     (<main className='flex w-full h-full flex-col items-center justify-center'>
     {/* Bottombar */}
        <div className='flex md:hidden w-full fixed border-t borderColor bg-black bottom-0 left-0 right-0 overflow-x-hidden items-center'>
          { isLeftVisible &&
            <div className='flex p-2 items-center absolute text-white left-0 bottom-0 pr-4 w-20 h-full bg-gradient-to-r from-black from-60% to-transparent'>
              <SlArrowLeft title='Move Left' onClick={handleScrollLeft} className='cursor-pointer' size={20} />
              </div>
            }
            <div className="flex h-16 pl-6 w-full overflow-x-hidden">
              <div ref={scrollContainerRef} className="flex gap-2 justify-between items-center text-white h-full overflow-x-auto" style={{ display: 'flex' }}>
                {Categories.map((category) => (
                  <div className='flex justify-center items-center w-full' key={category} onClick={() => handleSelectCategory(category)}>
                    <span className={clickedBar === category ? 'selectedBottomBar gradient-border' : 'BottomBarList'}>{category}</span>
                  </div>
                ))}
                <div className='flex pl-5 w-full'></div> 
              </div>
            </div>

            { isRightVisible &&
              <div className='flex items-center absolute text-white right-0 p-2 bottom-0 bg-gradient-to-l justify-end from-black from-60% to-transparent w-20 h-full'>
                <SlArrowRight onClick={handleScrollRight} title='Move Right' className='cursor-pointer' size={20} />
              </div>
            }
          </div>
          
          <div className='flex gap-2'>
          {/* Sidebar */}
          <div className="md:flex hidden h-[700px] w-full max-w-[200px] lg:max-w-[250px]">
            <div className="w-full flex flex-col p-4 border-l border-r borderColor">
              <span className="text-4xl font-bold mb-4">Menu</span>
              <ul className="w-full flex justify-center flex-col gap-3 mt-1">
                {Categories.map((category) => (
                  <li  className={clickedBar === category ? 'selected' : 'list'} key={category} onClick={() => handleSelectCategory(category)}>
                    <span>{category}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        {/* Menubar */}
          <div className='flex flex-col mt-1 md:mt-0'>
              <div className='flex justify-center pb-2'><h1 className='font-bold text-4xl'>{clickedBar}</h1></div>
              <div className='xs:grid xs:grid-cols-2 lg:grid-cols-3 max-w-[1100px] flex flex-col justify-center items-center w-full gap-3 p-3 overflow-y-auto md:h-[640px] h-full mb-20 md:mb-0'>
                {selectedArray.map((item) => (
                  <div key={item.id} onClick={() => {setSelectedItem(item); setSelectedStoreItem(item)}} className='p-3 bg-white rounded-3xl w-full max-w-[350px]'>
                  
                  { ownerUser &&
                    <span className="flex justify-center items-center bg-red-600 text-white text-xs w-6 h-6 rounded-full p-1">
                      {ownerUser?.cart?.filter((item2) => typeof item2 === 'object' && (item2 as {title:string}).title === item.title).length}
                    </span>
                  }
      
                    <Image onClick={() => setIsItemVisible(true)} className='w-full rounded-lg cursor-pointer'
                      src={item.image} alt={item.title}
                      placeholder="blur"
                    /> 
                    <div className='pt-2 '>
                        <h3 className='text-xl font-bold text-black'>{item.title}</h3>
                        <div className='flex justify-between'>
                          <h3 className='text-xl font-extrabold text-[#ff00e1]'>{item.sum}.000 <span className='text-white font-semibold'>sum</span></h3>
                          <span className='text-green-500 font-semibold'>{item?.promoItems}</span>
                        </div>
                      <div className='flex justify-center items-center mt-3'>
                        <button onClick={() => setIsItemVisible(true)} className='bg-[#4b2971] border text-white rounded-full p-2 w-full max-w-[100px]'>
                          Check
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
        {/* Show the slected item in depth */}
          {isItemVisible && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-90 z-50">
              <div className="bg-gray-100 p-4 space-y-5 max-w-md rounded-lg border shadow-xl">
                <div className="flex justify-end mt-[-10px]">
                  <MdClose title='Close' size={30} className="text-black hover:bg-slate-300 rounded-full cursor-pointer" onClick={() => setIsItemVisible(false)} />
                </div>
                {selectedItem?.image && (
                  <Image src={selectedItem?.image} alt="" className="w-full rounded-lg mb-4 shadow-md" />
                )}
                <h2 className="text-3xl font-bold text-purple-600 mb-2">{selectedItem?.title}</h2>
                <p className="text-gray-800 mb-4">{selectedItem?.description}</p>
                <span className="text-xl font-bold text-purple-600">{selectedItem?.sum}.000 sum</span>
                <div className="flex justify-between items-center">
                  <Link className='text-xl bg-slate-300 no-underline p-2 px-3 rounded-2xl' href='/cart'>View cart</Link>
                  <button onClick={handleAddToCart} title='Add to cart' className="bg-purple-600 text-white rounded-full p-2 flex items-center space-x-2 hover:bg-purple-700 px-4 relative">
                    <MdAddShoppingCart size={30} />
                    { ownerUser &&
                      <span className="flex justify-center items-center absolute -top-1 -right-[1px] bg-red-600 text-white text-xs w-6 h-6 rounded-full p-1">
                        {ownerUser?.cart.filter((item) => typeof item === 'object' && (item as { title: string }).title === selectedItem?.title).length}
                      </span>
                    }
                  </button>
                </div>
              </div>
            </div>
          )}

          {loading ? (
                <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 p-2">
                  <FadeLoader color='#F9008E' loading={true} /> 
                </div>
            ) : (
              ''
            )
          }
     </main>)
    :
     (<div className='flex justify-center items-center h-screen bg-black'><PuffLoader size={150} color='#F9008E' loading={true} /></div>)
     }
    </> 
  )
};

export default MenuBar;



