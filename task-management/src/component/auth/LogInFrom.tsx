'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  // const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // console.log("signIn: ",email, password);
   
    try {
      await signIn('credentials', { email, password, redirect: true, callbackUrl: '/dashboard' });
      // router.push('/dashboard'); // Redirect to the home page or any other page after successful sign-in
    } catch (error) {
      console.error('Error during sign-in:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred during sign-in. Please try again.',
      });
      
    }

      
    
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-4xl font-semibold text-black text-center">Log In</h1>
      <h2 className="text-gray-600 text-center mt-2">
        Welcome back! Please enter your details to log in.
      </h2>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="flex flex-col gap-4">
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute inset-y-0 right-2 flex items-center text-gray-600"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            Remember me
          </label>
          <a href="#" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[rgb(86,296,229)] text-black py-2 rounded-md hover:bg-[rgb(78,228,203)] transition"
        >
          {loading ? 'Signing in…' : 'Log In'}
        </button>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/registration" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
