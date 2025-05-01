"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BiTask } from "react-icons/bi";

const DashboardMenu = () => {
  const link = "/dashboard/task/add-task";

  // State variables to hold the selected values
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  console.log(selectedCategory, selectedStatus);

  return (
    <div>
      <div className="flex justify-around max-sm:flex-col items-center p-4">
        <h1 className="font-bold text-2xl">All Task List</h1>
        <div className="flex gap-4 items-center flex-col lg:flex-row">
          {/* task category */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="select select-neutral w-[200px]"
            >
              <option value="" disabled>
                Select Task Category
              </option>
              <option value="friends">friends</option>
              <option value="sports">sports</option>
              <option value="family">family</option>
              <option value="nature">nature</option>
              <option value="art and craft">art and craft</option>
            </select>
          </div>

          {/* all task */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="select select-neutral w-[200px]"
            >
              <option value="" disabled>
                All Task
              </option>
              <option value="pending">pending</option>
              <option value="inprogress">inprogress</option>
              <option value="ongoing">ongoing</option>
              <option value="completed">completed</option>
            </select>
          </div>

          <Link
            href={link}
            className="btn btn-wide btn-info text-white px-4 py-2 rounded-lg"
          >
            <BiTask /> Add Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardMenu;
