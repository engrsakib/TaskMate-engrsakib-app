import Link from "next/link";
import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaSwatchbook } from "react-icons/fa";
import { TbCategoryPlus } from "react-icons/tb";

interface Task {
  // Define the properties of the task object here
  // For example:
  _id: string;
  title: string;
  shortDescription: string;
  status: string;
  email: string;
  day: string;
  date: string;
  author: string;
  category: string;
}
const DashboardTask = ({ task }: { task: Task }) => {
  

  return (
    <div className="card w-full min-h-[200px] max-sm:py-3 bg-base-100 drop-shadow-2xl shadow-xl">
      {/* title section */}
      <Link href={`/dashboard/task/${task?._id}`} className="w-10/12 mx-auto flex items-center gap-x-1">
      <div className="w-10/12 mt-9 mx-auto flex items-center gap-x-1">
        <div className="bg-cyan-400 w-[40px] h-[40px] rounded-full flex justify-center items-center">
          <FaSwatchbook />
        </div>{" "}
        <h1 className="lg:text-xl text-[15px] font-bold">{task?.title}</h1>
      </div>
       </Link>
      {/* description section */}
      <div className="w-10/12 mt-4 mx-auto flex items-center gap-x-1">
        <p className="text-md text-gray-500">{task?.shortDescription}</p>
      </div>
      {/* catagory status date */}
      <div className="w-10/12 mt-4 mx-auto flex justify-between flex-wrap max-sm:gap-y-2 items-center gap-x-1">
        
        <div className="flex items-center gap-x-1"> 
        <TbCategoryPlus /> <p>{task?.category}</p>
        </div>

        <div className="flex items-center gap-x-1"> 
        <BsCalendarDate /> <p> {task?.date}</p>
        </div>

        <div className={`badge badge-outline ${task?.status === "completed" ? "badge-success" : task?.status === "pending" ? "badge-warning" : "badge-error"}`}> 
        <p>{task?.status}</p>
        </div>


      </div>
    </div>
  );
};

export default DashboardTask;
