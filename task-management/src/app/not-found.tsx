import React from 'react'
import cover from '@/assets/images/cover.jpg'
import noFound from '@/assets/images/notFounds.jpg'
import Image from 'next/image'

export default function notFound() {
  return (
    <div className='relative'>
      {/* cover */}
      <div className='w-full'>
        <Image src={cover} alt='this is cover image'/>
      </div>
    
        {/* container */}
        <div className='rounded-lg bg-white shadow-xl drop-shadow-xl p-4  w-[80%] mx-auto mt-4 absolute top-[250px] md:top-[350px] lg:top-[450px] left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-[100px]'>
            <Image src={noFound} alt='this is cover image' className='rounded-lg mx-auto' width={700}/>
        </div>

    </div>
  )
}
