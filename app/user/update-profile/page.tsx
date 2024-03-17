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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);

    const MAX_FIRSTNAME_LENGTH = 70;
    const handleFirstNameChange = (e: { target: { value: any; }; }) => {
         const inputFirstName = e.target.value;
         const limitedFirstName = inputFirstName.substring(0,  MAX_FIRSTNAME_LENGTH); 
         setFirstName(limitedFirstName);
    };
    const remainingFirstNameCharacters = MAX_FIRSTNAME_LENGTH - firstName.length;
 
    const MAX_LASTNAME_LENGTH = 70;
    const handleLastNameChange = (e: { target: { value: any; }; }) => {
         const inputLastName = e.target.value;
         const limitedLastName = inputLastName.substring(0,  MAX_LASTNAME_LENGTH); 
         setLastName(limitedLastName);
    };
    const remainingLastNameCharacters = MAX_LASTNAME_LENGTH - lastName.length;

    const MAX_LOCATION_LENGTH = 250;
    const handleAddressChange = (e: { target: { value: any; }; }) => {
         const inputLocation = e.target.value;
         const limitedLocation = inputLocation.substring(0, MAX_LOCATION_LENGTH); 
         setDeliveryAddress(limitedLocation);
     };
    const remainingLocationCharacters = MAX_LOCATION_LENGTH - deliveryAddress.length;
  
 
    const handleUpdateData = async (e: { preventDefault: () => void; }) => {
     e.preventDefault();
     setLoading(true);
   
     try {
       if (ownerUser && user) {
         const userRef = doc(db, "users", user.uid);
         const newData = {
           firstName: firstName || ownerUser.firstName ||"", 
           lastName: lastName || ownerUser.lastName ||"", 
           deliveryAddress: deliveryAddress || ownerUser.deliveryAddress || "", 
         };
   
         await updateDoc(userRef, newData);
         console.log('Document updated successfully');
         setLoading(false)
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
             <label htmlFor="first-name" className="block text-gray-700 text-sm font-bold mb-2">
               First Name <span className="text-gray-500 text-sm">{remainingFirstNameCharacters}/{MAX_FIRSTNAME_LENGTH}</span>
             </label>
             <input
               id="first-name"
               type="text"
               value={firstName}
               onChange={handleFirstNameChange}
               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
             />
           </div>
           <div className="mb-4">
             <label htmlFor="last-name" className="block text-gray-700 text-sm font-bold mb-2">
               Last Name <span className="text-gray-500 text-sm">{remainingLastNameCharacters}/{MAX_LASTNAME_LENGTH}</span>
             </label>
             <input
               id="last-name"
               type="text"
               value={lastName}
               onChange={handleLastNameChange}
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