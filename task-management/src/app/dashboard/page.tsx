import DashboardItems from '@/component/auth/dashboard/DashboardItems'
import DashboradMenu from '@/component/auth/dashboard/DashboradMenu'
import React from 'react'


export default function dashboardPage() {
  return (
    <div className='bg-white w-[90%] mx-auto min-h-screen border-transparent rounded-2xl drop-shadow-2xl'>
      {/* all Task menue */}
      <DashboradMenu></DashboradMenu>
      <div>
      <DashboardItems/>

      </div>

    </div>
  )
}
