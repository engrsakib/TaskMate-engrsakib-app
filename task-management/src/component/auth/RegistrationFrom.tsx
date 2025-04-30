'use client';
import React, { useState, useMemo } from 'react';
import Swal from 'sweetalert2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function RegistrationForm() {
  const [fullName, setFullName] = useState('');
  const [email,    setEmail   ] = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm ] = useState('');
  const [showPwd,  setShowPwd ] = useState(false);
  const [loading, setLoading ] = useState(false);

  // Password strength scoring
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password))    score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    switch (score) {
      case 5: return 'Too Strong';
      case 4: return 'Strong';
      case 3: return 'Medium';
      case 2: return 'Weak';
      default: return 'Too Weak';
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      return Swal.fire({ icon:'error', title:'Error', text:'Passwords do not match.' });
    }
    if (strength === 'Too Weak' || strength === 'Weak') {
      return Swal.fire({ icon:'warning', title:'Weak Password', text:'Choose a stronger password.' });
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ fullName, email, password }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Signup failed');
      await res.json();
      Swal.fire({ icon:'success', title:'Registered!', text:'Your account has been created.' });
      // Optionally redirect or clear form...
    } catch (err: any) {
      Swal.fire({ icon:'error', title:'Signup Failed', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center">Register</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <input
          type="text" required
          value={fullName} onChange={e=>setFullName(e.target.value)}
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <input
          type="email" required
          value={email} onChange={e=>setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <div className="relative">
          <input
            type={showPwd ? 'text' : 'password'} required
            value={password} onChange={e=>setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded pr-10 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={()=>setShowPwd(v=>!v)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-600"
          >
            {showPwd ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        {password && (
          <div className="text-sm">
            Strength: <span className={
              strength==='Too Strong'? 'text-green-700' :
              strength==='Strong'?    'text-green-500' :
              strength==='Medium'?    'text-yellow-500' :
              strength==='Weak'?      'text-orange-500' : 'text-red-500'
            }>{strength}</span>
          </div>
        )}

        <input
          type="password" required
          value={confirm} onChange={e=>setConfirm(e.target.value)}
          placeholder="Confirm Password"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  );
}
