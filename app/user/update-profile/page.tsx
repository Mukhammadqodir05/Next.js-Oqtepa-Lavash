'use client'
import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import OwnerUserdata from '@/app/componets/owneruserdata';
import { db, auth } from '@/app/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdClose } from 'react-icons/md';
import Link from 'next/link';
import { PulseLoader } from 'react-spinners';

const Page = () => { 
    const { ownerUser } = OwnerUserdata();
    const [fullName, setFullName] = useState('');
    const [card, setCard] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);

    const MAX_FULLNAME_LENGTH = 70;
    const handleFullNameChange = (e: { target: { value: any; }; }) => {
         const inputFullNmae = e.target.value;
         const limitedFullName = inputFullNmae.substring(0, MAX_FULLNAME_LENGTH); 
         setFullName(limitedFullName);
    };
    const remainingFullNameCharacters = MAX_FULLNAME_LENGTH - fullName.length;
 
    const MAX_LOCATION_LENGTH = 250;
    const handleAddressChange = (e: { target: { value: any; }; }) => {
         const inputLocation = e.target.value;
         const limitedLocation = inputLocation.substring(0, MAX_LOCATION_LENGTH); 
         setDeliveryAddress(limitedLocation);
     };
    const remainingLocationCharacters = MAX_LOCATION_LENGTH - deliveryAddress.length;
  
    const MAX_CARD_LENGTH = 50;
    const handleCardChange = (e: { target: { value: any; }; }) => {
         const inputBio = e.target.value;
         const limitedBio = inputBio.substring(0, MAX_CARD_LENGTH); 
         setCard(limitedBio);
    };
    const remainingCharacters = MAX_CARD_LENGTH- card.length;
   

    const handleUpdateData = async (e: { preventDefault: () => void; }) => {
     e.preventDefault();
     setLoading(true);
   
     try {
       if (ownerUser && user) {
         const userRef = doc(db, "users", user.uid);
         const newData = {
           fullName: fullName || ownerUser.fullName ||"", 
           card: card || ownerUser.card || "",
           deliveryAddress: deliveryAddress || ownerUser.deliveryAddress || "", 
         };
   
         await updateDoc(userRef, newData);
         window.location.href = "/user";
         console.log('Document updated successfully');
       } else {
         console.error('Error: User data not available');
       }
     } catch (error) {
       console.error('Error updating document:', error);
     }
    };
   

    return (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-50">
         <form className="p-4 max-w-md w-full bg-white shadow rounded-lg" onSubmit={handleUpdateData}>
            <Link href='/user' className="flex justify-end mt-[-10px]">
                  <MdClose title='Close' size={30} className="text-black hover:bg-slate-300 rounded-full cursor-pointer"/>
            </Link>
           <div className="mb-4">
             <label htmlFor="full-name" className="block text-gray-700 text-sm font-bold mb-2">
               Full Name <span className="text-gray-500 text-sm">{remainingFullNameCharacters}/{MAX_FULLNAME_LENGTH}</span>
             </label>
             <input
               id="full-name"
               type="text"
               value={fullName}
               onChange={handleFullNameChange}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             />
           </div>
           <div className="mb-4">
             <label htmlFor="card" className="block text-gray-700 text-sm font-bold mb-2">
               Card <span className="text-gray-500 text-sm">{remainingCharacters}/{MAX_CARD_LENGTH}</span>
             </label>
             <input
               id="card"
               type="text"
               value={card}
               onChange={handleCardChange}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             />
           </div>
           <div className="mb-4">
             <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
               Address <span className="text-gray-500 text-sm">{remainingLocationCharacters}/{MAX_LOCATION_LENGTH}</span>
             </label>
             <textarea
               id="address"
               value={deliveryAddress}
               onChange={handleAddressChange}
               className="shadow appearance-none border rounded w-full h-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             />
           </div>
           <div className="flex items-center justify-between">
             <button
               type="submit"
               className="w-full flex items-center justify-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline bg-blue-500 hover:bg-blue-700"
             >
               { loading ? <PulseLoader color='#fff' size={20} loading={true} /> : 'Update Profile'}
             </button>
           </div>
         </form>
       </div>       
    )
}

export default Page