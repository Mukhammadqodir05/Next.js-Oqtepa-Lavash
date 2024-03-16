import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  orders: string[];
  card: { cardNumber: string; expiryDate: string }[]; 
  cart: string[];
  timestamp: string;
  uid: string;
  deliveryAddress: string;
}


const OwnerUserdata = () => {
  const [user] = useAuthState(auth);
  const [isDownloading, setIsDownloading] = useState(true)
  const [ownerUser, setOwnerUser] = useState<User | null>();
  const [showSlowInternetMessage, setShowSlowInternetMessage] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
  
    if (user) {
      const unsubscribe = onSnapshot(query(collection(db, "users"), where("uid", "==", user?.uid)), (snapshot) => {
        snapshot.forEach((doc) => {
          const userData = doc.data() as User;
          setOwnerUser(userData);
          setShowSlowInternetMessage(false);
          setIsDownloading(false)
          clearTimeout(timeoutId); 
        });
      });
  
      timeoutId = setTimeout(() => {
        setShowSlowInternetMessage(true); 
        setIsDownloading(false)
      }, 10000);
  
      return () => {
        unsubscribe();
        clearTimeout(timeoutId);
      };
    }
  }, [user]);
  

  useEffect(() => {
    if (ownerUser) {
      setShowSlowInternetMessage(false);
    }
  }, [ownerUser]);
  


  return { ownerUser, showSlowInternetMessage, isDownloading }
}

export default OwnerUserdata