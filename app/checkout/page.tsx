'use client'
import React, { useState } from 'react';
import OwnerUserdata from '../componets/owneruserdata';
import Image from 'next/image';
import Link from 'next/link';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { PulseLoader } from 'react-spinners';
import { MdClose } from 'react-icons/md';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import Navbar from '../componets/navbar';
import Footer from '../componets/footer';

const Page = () => {
  const [cardNotSelected, setCardNotSelected] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [showCardForm, setShowCardForm] = useState(false);
  const { ownerUser } = OwnerUserdata();
  const [showCardOptions, setShowCardOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleDateSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(e.target.value);
  };

  interface Card {
    cardNumber: string;
    expiryDate: string;
  }
  

 
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  
  const handleCardClick = (card: Card) => {
    setSelectedCard(card);
    setShowCardOptions(false);
    console.log(card);
  };
  
  

  type ItemType = {
         image: string;
         sum: number;
         title: string;
         id: string;
         promoItems: any[];
         description: string;
         count: number; 
       };
       
  let cartItems: ItemType[] = [];
  
  if (ownerUser?.cart) {
    cartItems = ownerUser.cart.reduce((acc: ItemType[], item: any) => {
      const existingItem = acc.find((cartItem) => cartItem.title === item.title);
      if (existingItem) {
        existingItem.count++;
        existingItem.sum += item.sum;
      } else {
        acc.push({
          image: item.image,
          sum: item.sum,
          title: item.title,
          id: item.id,
          promoItems: item.promoItems,
          description: item.string,
          count: 1,
        });
      }
      return acc;
    }, []);
  }
  const totalSum = cartItems.reduce((total, item) => total + item.sum, 0);
     
  const handleAddPaymentMethod = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const id = user?.uid + "_" + Date.now();
  
    try {
      if (ownerUser && user) {
        const userRef = doc(db, "users", user.uid);
        const existingCardArray = ownerUser.card || []; 
        const newCard = {
          id: id,
          cardNumber: cardNumber,
          expiryDate: expiryDate
        };
        const updatedCardArray = [...existingCardArray, newCard]; 
        await updateDoc(userRef, { card: updatedCardArray });
        console.log('Document updated successfully');
        setShowCardForm(false)
      } else {
        console.error('Error: User data not available');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleOrder = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    const id = Date.now();
  
    try {
      if (ownerUser && user && selectedCard) {
        const userRef = doc(db, "users", user.uid);
        const existingOrdesArray = ownerUser.orders || []; 
        const newOrder = {
          id: id,
          time: selectedDate + ' ' + selectedTime,
          cardNumber: selectedCard?.cardNumber,
          expiryDate: selectedCard?.expiryDate,
          deliverAddress: ownerUser.deliveryAddress,
          totalSum: totalSum,
          deliveryFee: '0 sum'
        };
        const updatedOrdersArray = [...existingOrdesArray, newOrder]; 
        await updateDoc(userRef, { orders: updatedOrdersArray });
        setShowSuccess(true)
        console.log('Document updated successfully');
        setShowCardForm(false)
      } else {
        console.error('Error: User data not available');
      }
    } catch (error) {
      console.error('Error updating document:', error);
    } finally{
      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    }
  };

  setTimeout(() =>{
    setCardNotSelected(false)
  }, 3000)

  return (
    <>
    {ownerUser ? 
      <main className='flex gap-5 bg-black flex-col justify-center items-center w-full h-full p-2 pt-5 text-white overflow-hidden'>
       <Navbar/>
         <div className='pt-[60px]'>
            <h1 className='text-4xl font-bold gradient-text'>Oqtepa Lavash</h1>
          </div>
          <div className='flex justify-center items-center flex-col lg:flex lg:flex-row gap-5 w-full h-full'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col w-full max-w-[550px] gap-2 border-1 border-gray-600 rounded-3xl h-[300px] p-3'>
            <div className='flex w-full justify-between gap-2'>
              <h1 className='text-white text-2xl text-nowrap'>Delivery Address</h1>
              <Link href='/user/update-profile' className='text-xl text-nowrap no-underline text-blue-600'>Edit the address</Link>
            </div>
            <div className='w-full overflow-y-auto  border-gray-600  p-2'>
                <h2 className='text-gray-400 text-[16px]'>{ownerUser?.deliveryAddress}</h2>
            </div>
              </div>

            <div className='flex flex-col w-full max-w-[550px] h-[600px] justify-center items-center'>
              <div className='flex w-full text-white justify-between items-center border-gray-600 border-t border-l rounded-t-lg border-r p-3'>
                <h1 className="text-2xl font-extrabold">Your products</h1>
               </div>
                <div className="flex w-full flex-col overflow-y-auto h-[550px] border-1 border-gray-600 rounded-b-lg">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex w-full flex-col items-center justify-between border-b border-gray-600 py-3 p-3">
                      <div className='flex w-full items-center justify-between'>
                        <div className="flex items-center space-x-4">
                          <Image src={item.image} alt='' className="w-16 h-16 object-cover rounded-lg" />
                          <div className='flex overflow-hidden'>
                            <h5 className="overflow-hidden text-ellipsis md:whitespace-nowrap text-white">{item.title}</h5>
                          </div>
                        </div>
                        <div className='flex flex-col'>
                          <span className="font-semibold text-[#ffea00] text-nowrap">{item.sum}.000 sum</span>
                          <span className="font-semibold text-gray-400 text-nowrap">{item.count} added</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
               </div>
            </div>

              <div className='flex w-full h-full flex-col gap-5 max-w-[450px]'>
                <div className='w-full h-[250px] border-1 border-gray-600 rounded-3xl p-3 bg-black'>
                  <h1 className='text-white text-2xl font-bold'>Choose the Delivery Time!</h1>
                  <div className='flex w-full justify-center mt-3 gap-4'>
                    <select className='w-full max-w-[200px] text-black bg-white rounded-xl p-2 outline-none' onChange={handleDateSelection} value={selectedTime}>
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                    </select>
                     <select className='w-full max-w-[150px] text-black bg-white rounded-xl p-2 outline-none' onChange={handleTimeSelection} value={selectedTime}>
                      <option value="11:00">11:00</option>
                      <option value="02:00">12:00</option>
                      <option value="02:30">14:30</option>
                      <option value="11:00">18:00</option>
                      <option value="11:00">22:00</option>
                      <option value="11:00">12:00</option>
                      <option value="02:00">02:00</option>
                      <option value="02:30">02:30</option>
                    </select>
                  </div>
                </div>

                <div className='flex flex-col justify-center items-center bg-black h-full w-full'>
                  <div className='w-full max-w-[400px] space-y-2 h-[500px] border-1 border-gray-600 rounded-3xl p-3 bg-black flex flex-col'>
                    <h1 className='text-white text-2xl font-bold text-center mb-3'>Payment method</h1>
                    
                    <div onClick={() => setShowCardOptions((prev) => !prev)} className='flex justify-between items-center w-full h-16 border-1 border-gray-600 rounded-2xl p-2'>
                        <span className=''>Choose</span>
                        <span className='cursor-pointer'>{showCardOptions? <SlArrowUp /> : <SlArrowDown />}</span>
                      </div>
                      {showCardOptions && (
                        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                          <div className='flex flex-col w-full max-w-[400px] h-[450px] justify-center p-3 rounded-2xl bg-white shadow-lg'>
                            <div onClick={() => setShowCardOptions((prev) => !prev)} className="flex justify-end mt-[-10px] mr-[-5px]">
                              <MdClose title='Close' size={30} className="text-black hover:bg-slate-300 rounded-full cursor-pointer"/>
                            </div>
                            <div className='flex flex-col w-full h-[400px] overflow-y-auto'>
                              {ownerUser?.card.length && ownerUser?.card.length > 0 ? (
                                ownerUser?.card.map((item, index) => (
                                  <div onClick={() => {handleCardClick(item)}} key={index} className='bg-gray-100 rounded-lg p-4 m-2 cursor-pointer'>
                                    <h1 className="text-xl text-[#9400f7] font-semibold">Card Number: {item.cardNumber}</h1>
                                    <p className="text-gray-600">Expiry Date: {item.expiryDate}</p>
                                  </div>
                                ))
                              ) : (
                                <div className='flex flex-col items-center justify-center h-full'>
                                  <p className='text-black text-xl font-bold mb-4'>There is no card added yet</p>
                                </div>
                              )}
                            </div>
                            <button onClick={() => {setShowCardForm((prev) =>! prev); setShowCardOptions(false)}} className='text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg mt-2'>Add a card</button>
                          </div>
                        </div>
                      )}
                  
                      <div className='flex flex-col w-full h-[270px] p-2'>
                        <h2 className='text-white text-[20px]'>Card:
                        {selectedCard && (
                            <div className='flex flex-col ml-2 cursor-pointer overflow-hidden'>
                              <span className="text-[15px] text-[#9400f7] font-semibold text-nowrap text-ellipsis">Card Number: {selectedCard.cardNumber}</span>
                              <span className="text-[15px] text-gray-600 text-nowrap text-ellipsis">Expiry Date: {selectedCard.expiryDate}</span>
                            </div>
                          )}
                        </h2>
                        <h1 className='text-white text-[20px]'>Total {totalSum}.000 sum</h1>
                        <h2 className='text-white text-[20px]'>Delivery fee: 0 sum</h2>
                      </div>
                    {selectedCard ? (<div onClick={handleOrder} className='flex justify-center items-center w-full font-bold text-[#000000] border bg-slate-500 rounded-xl'>
                        <button title='Order' className='p-2'>Place Order</button>
                      </div>
                    )
                      :
                      (
                        <div onClick={() => setCardNotSelected((prev) =>! prev)} className='flex justify-center items-center w-full font-bold text-[#000000] border bg-slate-500 rounded-xl'>
                          <button title='Order' className='p-2'>Place Order</button>
                        </div>
                      )
                    }
                    </div>
                 </div>
            </div>

          { cardNotSelected &&
           <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
             <h1 className='w-full text-2xl flex items-center max-w-[400px] h-[300px] bg-white text-black p-3 rounded-3xl'>You have not selected a card yet!</h1> 
           </div>
          }

           {showSuccess && (
                <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50'>
                  <h1 className='w-full text-[#ff07ee] text-2xl flex items-center max-w-[400px] h-[300px] bg-white p-3 rounded-3xl animate-fade-in'>
                    Congratulations, your order has been placed!
                  </h1>
                </div>
              )}

          {/* Show the add payment method form */}
            { showCardForm &&
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-50">
               <form className="p-4 max-w-md w-full bg-white shadow rounded-lg" onSubmit={handleAddPaymentMethod}>
                <div onClick={() => setShowCardForm((prev) =>! prev)} className="flex justify-end mt-[-10px]">
                  <MdClose title='Close' size={30} className="text-black hover:bg-slate-300 rounded-full cursor-pointer"/>
                </div>
                <div className="mb-4">
                  <label htmlFor="card-number" className="block text-gray-700 text-sm font-bold mb-2">
                    Card Number
                  </label>
                  <input
                    id="card-number"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="expiry-date" className="block text-gray-700 text-sm font-bold mb-2">
                    Expiry Date
                  </label>
                  <input
                    id="expiry-date"
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700"
                  >
                    { loading ? <PulseLoader color='#fff' size={20} loading={true} /> : 'Add Payment Method'}
                  </button>
                </div>
              </form>
             </div> 
            }

          </div>
           <Footer />
         </main>
       : 
        (<div className="flex h-screen justify-center items-center text-center w-full bg-black">
            <PulseLoader color='#8800ff' size={50} loading={true} /> 
          </div>)
      }
    </>
   );
};

export default Page;
