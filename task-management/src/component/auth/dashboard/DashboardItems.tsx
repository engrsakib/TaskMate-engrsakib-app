"use client"
import Image from 'next/image';
import React from 'react'
import noData from '@/assets/images/nodata.svg'
export default function DashboardItems() {
    const [task, setTask] = React.useState([]);

    if(task.length === 0) {
        return <Image src={noData} alt="No Data" className='w-[50%] mx-auto mt-10' />;
    }
    return (
        <div>
          
        </div>
      )

  
}
