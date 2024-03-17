'use client'
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { auth } from '../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { BeatLoader } from 'react-spinners';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter() 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      Cookies.set('loggedin', 'true', { expires: 30 });
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again.');
    } finally {
      router.push('/')
      setLoading(false);
    }
  };

  return (
    <main className="bg-black flex w-full items-center justify-center h-screen text-white p-3 overflow-hidden">
        <div className=" border w-full h-full max-w-[350px] max-h-[550px] flex flex-col items-center rounded-3xl p-4">
          <div className="space-y-6 mt-8 text-center">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="text-lg">Log in to your account</p>
          </div>
          
          <div className="mt-8 absolute">
            {error && <p className="text-red-500 text-lg">{error}</p>}
          </div>
          
          <form onSubmit={handleLogin} className="mt-8 w-full max-w-[300px] space-y-5">
            <input
              className="input outline-none py-3 px-4 bg-transparent border-b w-full"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="off"
            />
            <div className="relative">
              <input
                className="input outline-none py-3 px-4 bg-transparent border-b w-full"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                autoComplete="off"
              />
              <span
                className="absolute right-4 top-[50%] transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(prevShow => !prevShow)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="w-full rounded-full py-3 text-white bg-purple-600 hover:bg-purple-700">
              {loading? <BeatLoader color='#fff' loading={true} /> : "Sign in"}
            </button>
          </form>
          
          <div className="mt-10 text-center">
            <p className="text-base">Don't have an account?</p>
            <Link href="/auth/signup" className="underline text-base hover:underline text-blue-600">
              Create an account
            </Link>
          </div>
        </div>
    </main>
  );
};

export default SignIn;
