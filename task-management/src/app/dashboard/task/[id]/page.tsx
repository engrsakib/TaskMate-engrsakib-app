// app/dashboard/task/[id]/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DetailsPageMenu from '@/component/auth/dashboard/DetailsPageMenu'
import getATask from '@/lib/task/getATask'
import { BsCalendarDate } from 'react-icons/bs'
import { FaSwatchbook } from 'react-icons/fa'

interface Task {
  _id: string
  title: string
  shortDescription: string
  day: string
  date: string
  status: string
  category: string
}

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [data, setData] = useState<Task | null>(null)
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  // Fetch task on mount
  useEffect(() => {
    async function fetchTask() {
      const task = await getATask({ id: params.id })
      setData(task)
      setCategory(task.category)
      setStatus(task.status)
    }
    fetchTask()
  }, [params.id])

  const handleSave = async () => {
    if (!data) return
    await fetch(`/api/task/${data._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, status }),
    })
    router.refresh()
  }

  if (!data) {
    return <p className="text-center p-8">Loading...</p>
  }

  return (
    <div className="bg-white w-[90%] mx-auto py-4 min-h-screen rounded-2xl drop-shadow-2xl">
      {/* Menu */}
      <DetailsPageMenu id={data._id} />

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Header */}
        <div className="flex items-start gap-6">
          <div className="bg-cyan-400 w-20 h-20 text-4xl rounded-full flex justify-center items-center">
            <FaSwatchbook />
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{data.title}</h1>
            <p className="text-gray-500 mt-2">{data.shortDescription}</p>
          </div>
        </div>

        {/* Date & Status Display */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-xl">
            <BsCalendarDate />
            <span>{`${data.day}, ${data.date}`}</span>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-white font-semibold ${
              data.status === 'completed'
                ? 'bg-green-500'
                : data.status === 'pending'
                ? 'bg-yellow-500'
                : 'bg-red-500'
            }`}
          >
            {data.status}
          </span>
        </div>

        {/* Editable Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select category</option>
              <option value="art and craft">Art & Craft</option>
              <option value="nature">Nature</option>
              <option value="family">Family</option>
              <option value="sports">Sports</option>
              <option value="friends">Friends</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="inprogress">In Progress</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Save */}
          <div className="flex items-end">
            <button onClick={handleSave} className="btn btn-primary w-full">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
