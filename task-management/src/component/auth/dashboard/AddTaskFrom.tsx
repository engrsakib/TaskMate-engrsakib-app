'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function AddTaskForm() {
  const router = useRouter()

  // form state
  const [title, setTitle] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')

  const [date, setDate] = useState(new Date())
  const [day, setDay] = useState('')

  // update day whenever date changes
  useEffect(() => {
    const options = { weekday: 'long' }
    setDay(date.toLocaleDateString('en-US', options))
  }, [date])

  // format date as "12 April 2025"
  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  // submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      title,
      shortDescription,
      category,
      status,
      author: "engrsakiv",
      email: "engrsakib02@gmail.com",
      date: formatDate(date),
      day
    }

    try {
      const res = await fetch('http://localhost:5000/add/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        await Swal.fire({
          icon: 'success',
          title: 'Task Created!',
          text: 'Your task has been saved successfully.',
          confirmButtonText: 'Go to Dashboard'
        })
        router.push('/dashboard')
      } else {
        throw new Error('Save failed')
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Unable to save task. Please try again.'
      })
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 rounded my-1.5">
      <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded input input-success"
            placeholder="Task title"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-medium">Short Description</label>
          <textarea
            value={shortDescription}
            onChange={e => setShortDescription(e.target.value)}
            required
            className="w-full border p-2 rounded textarea textarea-success"
            placeholder="Brief details"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
            className="w-full border p-2 rounded select select-success"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="art and craft">Art & Craft</option>
            <option value="nature">Nature</option>
            <option value="family">Family</option>
            <option value="sports">Sports</option>
            <option value="friends">Friends</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block font-medium">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            required
            className="w-full border p-2 rounded select select-success"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
          </select>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date Picker */}
        <div>
          <label className="block font-medium">Date</label>
          <DatePicker
            selected={date}
            onChange={date => date && setDate(date)}
            minDate={new Date()}
            dateFormat="dd MMMM yyyy"
            className="w-full border p-2 rounded input input-success"
          />
        </div>

        {/* Calculated Day */}
        <div>
          <label className="block font-medium">Day</label>
          <input
            type="text"
            value={day}
            readOnly
            className="w-full border p-2 rounded bg-gray-100"
          />
        </div>

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
        >
          Save Task
        </button>
      </form>
    </div>
  )
}
