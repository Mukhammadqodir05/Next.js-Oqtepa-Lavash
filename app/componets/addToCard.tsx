'use client'
import { useState } from 'react'
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '@/app/firebase';
import OwnerUserdata from './owneruserdata';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelectedItemStore } from '../store/selectedItemStore';

const AddToCard = () => {
  const { ownerUser } = OwnerUserdata();
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const { selectedStoreItem } = useSelectedItemStore();
  const [isItemVisible, setIsItemVisible] = useState(false);

  const handleAddToCart = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (ownerUser && user) {
        const userRef = doc(db, "users", user.uid);
             const updatedCart = [...ownerUser.cart, selectedStoreItem];
             
             console.log(selectedStoreItem)
             const newData = {
                 cart: updatedCart
             };
    
             await updateDoc(userRef, newData);
             setLoading(false);
             setIsItemVisible(false)
             console.log('Document updated successfully');
             } else {
             console.error('Error: User data not available');
             }
    } catch (error) {
             console.error('Error updating document:', error);
    }
  };
  
  return { handleAddToCart, loading, isItemVisible, setIsItemVisible }
}

export default AddToCard