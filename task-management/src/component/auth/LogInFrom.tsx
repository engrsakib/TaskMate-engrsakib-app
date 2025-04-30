'use client'
import React from 'react'

function LogInFrom() {
  return (
    <div>
      {/* text */}
        <div>
        <h1 className='text-[40px] font-600 text-black text-center'>LogIn</h1>
        <h2 className='text-gray-600 capitalize '>WelcomeBack Please Enter Your Details to LogIn </h2>
        </div>

        {/* from */}
        <form>
            <div className='flex flex-col gap-4 mt-10'>
                <input type="text" placeholder='Email' className='border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500'/>
                <input type="password" placeholder='Password' className='border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500'/>
            </div>
    
            <div className='flex justify-between mt-4'>
                <div className='flex items-center gap-2'>
                <input type="checkbox" id="remember-me" className='w-4 h-4'/>
                <label htmlFor="remember-me" className='text-gray-600'>Remember Me</label>
                </div>
                <a href="#" className='text-blue-500'>Forgot Password?</a>
            </div>
    
            <button type="submit" className='btn btn-primary text-white py-2 px-4 rounded-md mt-6 w-full'>LogIn</button>
        </form>

    </div>
  )
}

export default LogInFrom
