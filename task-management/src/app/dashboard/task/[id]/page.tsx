"use client";
import getATask from "@/lib/task/getATask";
import React from "react";
import { BsCalendarDate } from "react-icons/bs";
import { FaSwatchbook } from "react-icons/fa";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await getATask({ id });
  console.log(data);
  return (
    <div className="bg-white w-[90%] mx-auto py-4 min-h-screen lg:h-screen border-transparent rounded-2xl drop-shadow-2xl">
      {/* menue */}
      <div className="border-b-1 h-[100px] border-gray-600 p-4 flex justify-between items-center">
        <h1 className="text-2xl text-black">Task Details</h1>

        <div className="flex items-center gap-x-2">
          <button className="btn btn-primary">Edit</button>
          <button className="btn btn-secondary">Delete</button>
          </div>
      </div>
      {/* task detials */}
      <div className="w-full h-[80%] flex flex-col justify-between ">
        <div className="w-10/12 mt-9 mx-auto flex items-center gap-x-1">
          <div className="flex gap-2 items-center justify-between w-full">
            <div className="bg-cyan-400 w-[80px] max-sm:hidden h-[80px] text-4xl rounded-full flex justify-center items-center">
              <FaSwatchbook />
            </div>

            <div className="w-11/12 mt-9 mx-auto">
              <h1 className="lg:text-4xl text-[25px] font-bold">
                {data?.title}
              </h1>
              <p className="text-gray-500 text-md mt-2">
                {data?.shortDescription}{" "}
                <span>
                  Female data refers to information collected and disaggregated
                  by sex, focusing on womens experiences, needs, and outcomes
                  across various domains like health, education
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* date and Time */}
        <div className="w-10/12 mt-4 mx-auto flex justify-between max-sm:flex-wrap max-sm:gap-y-2 items-center gap-x-1">
          <div className="w-10/12 mt-4 mx-auto flex items-center gap-x-1 text-xl lg:text-3xl">
            <BsCalendarDate />{" "}
            <p className="text-md text-gray-900">
              {data?.day} {data?.date}
            </p>
          </div>

          <div
            className={`w-10/12 mt-4 mx-auto flex items-center gap-x-1 text-xl lg:text-3xl ${
              data?.status === "completed"
                ? "text-green-500"
                : data?.status === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            <li>{data?.status}</li>
          </div>
        </div>

        {/* catagory status date */}
        <div className="w-10/12 mt-4 mx-auto flex justify-between flex-wrap max-sm:gap-y-2 items-center gap-x-1">
          <select
            defaultValue="Pick a Runtime"
            className="select select-success"
          >
            <option disabled={true}>Pick a category</option>
            <option>pending</option>
            <option>inprogress</option>
            <option>ongoing</option>
            <option>completed</option>
          </select>
        </div>
      </div>
    </div>
  );
}
