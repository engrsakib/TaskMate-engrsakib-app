"use client"
import Image from 'next/image';
import React from 'react'
import noData from '@/assets/images/nodata.svg'
export default function DashboardItems() {
    const [task, setTask] = React.useState([]);

    if(task.length === 0) {
        return (<>
            <div className='flex flex-col justify-center items-center h-screen'>
                <Image src={noData} alt="No Data" width={200} height={200} className='w-[300px] h-[300px]' />
                <h1 className='text-2xl font-bold capitalize'>No Task Avilable yet, please add your new Task</h1>
                <p className='text-lg'>You can add your new task by clicking the button below</p>
            </div>
        </>)
    }
    return (
        <div>
          
        </div>
      )

  
}
