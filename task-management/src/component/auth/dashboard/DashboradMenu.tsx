"use client";
import Link from "next/link";
import React from "react";
import { BiTask } from "react-icons/bi";

const DashboradMenu = () => {
  const link = "/dashboard/task/add-task";
  
  return (
    <div>
      <div className="flex justify-around max-sm:flex-col items-center p-4">
        <h1 className="font-bold text-2xl">All Task List</h1>
        <div className="flex gap-4 items-center flex-col lg:flex-row">
        {/* task category */}
        <div>
            <select
              defaultValue="Server location"
              className="select select-neutral w-[200px]"
            >
              <option disabled={false}>Select Task Category</option>
              <option>North America</option>
              <option>EU west</option>
              <option>South East Asia</option>
            </select>
          </div>
          
          {/* all task */}
          <div>
            <select
              defaultValue="Server location"
              className="select select-neutral w-[200px]"
            >
              <option disabled={false}>All Task</option>
              <option>North America</option>
              <option>EU west</option>
              <option>South East Asia</option>
            </select>
          </div>
          <Link href={link} className="btn btn-wide btn-info  text-white px-4 py-2 rounded-lg">
            <BiTask /> Add Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboradMenu;
