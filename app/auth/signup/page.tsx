'use client'
import React, { useState } from 'react';
import { db, auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { BsPersonCircle } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { setDoc,doc} from 'firebase/firestore';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';


const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter() 


  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          firstName: firstName,
          lastName: '',
          email: email,
          location: "",
          card: [],
          cart: [],
          deliveryAddress: '',
          orders: [],
          timestamp: Date.now()
        };
        await setDoc(doc(db, 'users', newUser.user.uid), userDoc);
      }
    
      Cookies.set('loggedin', 'true');
      console.log('Well done!')
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
    } finally {
      router.push('/')
      setLoading(false);
      setError('');
    }
  };


  return (
    <div className="flex bg-black w-full items-center justify-center h-screen p-3">
      <div className="md:w-80 border bg-transparent w-full h-full max-w-80 max-h-[500px] flex items-center flex-col rounded-3xl p-4">
        <div className="space-y-2 text-sky-400">
          <BsPersonCircle className="text-9xl cursor-pointer" />
          <h1 className="text-center">Register</h1>
        </div>
        <div className='absolute mt-[540px]'>
          {error && <p className="text-xl">{error}</p>}
        </div>
        <form onSubmit={handleSignUp} className="mt-[15px] text-white space-y-7 text-center">
          <input
            className="input outline-none py-1 p-1 bg-transparent border-b w-full max-w-[240px]"
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            autoComplete='off'
          />
          <input
            className="input outline-none py-1 p-1 bg-transparent border-b w-full max-w-[240px]"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email"
            autoComplete='off'
          />
         <div className='relative'>
            <input
              className='input outline-none py-1 p-1 bg-transparent border-b w-full max-w-[240px]'
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='Password'
              autoComplete='off'
            />
            <span
              className='absolute right-7 top-1/2 transform -translate-y-1/2 cursor-pointer'
              onClick={() => setShowPassword(prevShow => !prevShow)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <button type="submit" className="w-full max-w-[240px] rounded-full py-2 text-white bg-[#9101ff]">
           {loading? <BeatLoader color='#8ff' loading={true} /> :  "Sign up"} 
          </button>
        </form>
        <div className='absolute flex gap-2 mt-[440px]'>
          <p className="text-sm text-white">Already have an account?</p>
          <Link href="/auth/signin"
            className="underline text-sm hover:underline text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
