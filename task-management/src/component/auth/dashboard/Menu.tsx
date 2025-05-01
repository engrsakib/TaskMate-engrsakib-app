import Image from "next/image";
import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { LuClock12 } from "react-icons/lu";
import { PiSpinnerGapFill } from "react-icons/pi";
import userImage from "@/assets/images/user.svg";
import { MdOutlineArrowDropDown } from "react-icons/md";
import Link from "next/link";
export default function Menu() {
  const user = {
    FirstName: "Md. Nazmus ",
    LastName: "Sakib",
    email: "test@email.com",
    img: userImage,
    role: "admin",
  };
  return (
    <div className="w-[80%] mx-auto pt-8">
      {/* first */}
      <div className="flex justify-between items-center">
        {/* left */}
        <div className="flex items-center gap-4">
          <div className="w-[55px] h-[55px] rounded-xl bg-warning text-2xl text-white flex justify-center items-center">
            {" "}
            <LuClock12 />
          </div>{" "}
          <span className="font-600 text-2xl text-white max-sm:hidden">TaskMate</span>
        </div>
        {/* middle */}
        <div>
          <ul className="flex gap-8 mt-4">
            <Link href="/dashboard"><li className="text-white text-lg font-500 flex items-center gap-x-1">
              <FaClipboardList /> Task{" "}
            </li></Link>
            <Link href="/dashboard/spine"><li className="text-white text-lg font-500 flex items-center gap-x-1">
              <PiSpinnerGapFill /> Spin
            </li></Link>
          </ul>
        </div>
        {/* user data part */}
        <div className="flex items-center gap-4 text-2xl text-white font-500 max-lg:hidden">
          <div className="w-[50px]  h-[50px] rounded-full">
            <Image alt="user" src={user?.img} />
          </div>
          <h1 className="text-white font-medium text-2xl">
            {user?.FirstName}
            {user?.LastName}
          </h1>
          <MdOutlineArrowDropDown />
        </div>
      </div>
      {/* welcome massage */}
      <div className="mt-8">
        <p className="text-[#60e5ae] text-lg font-400 mt-2">
          Hi {user?.LastName}
        </p>
        <h1 className="text-white text-3xl font-600">Welcome to Dashboard!</h1>
      </div>
    </div>
  );
}
