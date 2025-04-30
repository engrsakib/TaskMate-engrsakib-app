'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import Link from 'next/link';

export default function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Login failed');
      }

      await res.json(); // assume { user, token }
      Swal.fire({
        icon: 'success',
        title: 'Logged in!',
        text: 'You have successfully signed in.',
      });
    } catch (err: any) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.message,
      });
    } finally {
      setLoading(false);
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
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
