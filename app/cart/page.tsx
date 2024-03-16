'use client'
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/app/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import OwnerUserdata from '../componets/owneruserdata';
import Image from 'next/image';
import Link from 'next/link';
import { GrAdd } from "react-icons/gr";
import { IoMdRemove } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";

const Page = () => {
  const { ownerUser } = OwnerUserdata();
  const [user] = useAuthState(auth);

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


  const handleAddToCart = async (e: { preventDefault: () => void; }, item: ItemType) => {
    e.preventDefault();

    let addedItem = ownerUser?.cart?.find((cartItem) => typeof cartItem === 'object' && (cartItem as {title:string}).title === item?.title);
    console.log(addedItem)
    try {
      if (ownerUser && user && addedItem) {
        console.log(addedItem)
        const userRef = doc(db, "users", user.uid);
             const updatedCart = [...ownerUser.cart, addedItem];
             
             const newData = {
                 cart: updatedCart
             };
    
             await updateDoc(userRef, newData);
             console.log('Document updated successfully');
             } else {
             console.error('Error: User data not available');
             }
    } catch (error) {
             console.error('Error updating document:', error);
    }
  };
  
  const handleRemoveFromCart = async (e: { preventDefault: () => void; }, item: ItemType) => {
    e.preventDefault();

    try {
        if (ownerUser && user) {
            const userRef = doc(db, "users", user.uid);
            const indexOfItemToRemove = ownerUser.cart.findIndex((cartItem) => typeof cartItem === 'object' && (cartItem as {title:string}).title === item.title);

            if (indexOfItemToRemove !== -1) {
                const updatedCart = [...ownerUser.cart];
                updatedCart.splice(indexOfItemToRemove, 1);

                const newData = {
                    cart: updatedCart
                };

                await updateDoc(userRef, newData);
                console.log('Document updated successfully');
            } else {
                console.error('Error: Item not found in the cart');
            }
        } else {
            console.error('Error: User data not available');
        }
    } catch (error) {
        console.error('Error updating document:', error);
    }
  };

  return (
   <div className="flex flex-col justify-center items-center w-full h-screen mx-auto bg-gradient-to-br cartBg font-sans p-1">
      <div className="shadow-md bg-black border h-[700px] rounded-2xl w-full max-w-[400px] overflow-hidden">
        <div>
          <div className='flex text-white justify-between items-center border-gray-600 border-b p-3'>
            <h1 className="text-2xl font-extrabold">Your Cart Items</h1>
            <Link title='Back To Home' href='/' className="text-2xl font-extrabold text-blue-600"><CiCircleRemove size={35} /></Link>
          </div>
           {cartItems && cartItems.length > 0 ? (
            <div className="flex w-full flex-col overflow-y-auto h-[550px]">
              {cartItems.map((item, index) => (
                <div key={index} className="flex w-full flex-col items-center justify-between border-b border-gray-600 py-3 p-3">
                  <div className='flex w-full items-center justify-between'>
                    <div className="flex items-center space-x-4">
                      <Image src={item.image} alt='' className="w-16 h-16 object-cover rounded-lg" />
                      <div className='flex overflow-hidden'>
                        <h5 className="overflow-hidden text-ellipsis md:whitespace-nowrap text-white">{item.title}</h5>
                      </div>
                    </div>
                    <div className=''>
                      <span className="font-semibold text-white text-nowrap">{item.sum}.000 sum</span>
                    </div>
                  </div>
                  <div className='flex items-center gap-5 mt-2'>
                    <div title='Remove From Cart' onClick={(e) => handleRemoveFromCart(e, item)} className='text-2xl cursor-pointer text-red-500 bg-slate-800 p-2 rounded-full'><IoMdRemove /></div>
                    <h1 className='text-2xl font-bold text-[#ff00e1]'>{item.count}</h1>
                    <div title='Add To Cart' onClick={(e) => handleAddToCart(e, item)} className='text-2xl cursor-pointer text-[#25ff03] bg-slate-800 p-2 rounded-full'><GrAdd /></div>
                  </div>
                </div>
              ))}
            </div>
         
          ) : (
            <div className='flex w-full h-[550px] justify-center items-center'>
              <p className="text-white text-xl">Your added products will appear here</p>
            </div>
          )}
           <div className='flex text-white justify-between items-center border-gray-600 border-t p-3'>
            <h1 className="text-xl font-bold text-[#ff9900]">{totalSum}.000 sum</h1>
            <Link title='Checkout' href='/checkout' className=" no-underline text-xl font-bold text-[#ffffff]">Checkout</Link>
          </div>
        </div>
      </div>
   </div>
  );
};

export default Page;
