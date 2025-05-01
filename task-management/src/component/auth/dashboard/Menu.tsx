import Image from "next/image";
import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { LuClock12 } from "react-icons/lu";
import { PiSpinnerGapFill } from "react-icons/pi";
import userImage from '@/assets/images/user.svg'
import { MdOutlineArrowDropDown } from "react-icons/md";
export default function Menu() {

    const user = {
        name: "Md. Nazmus Sakib",
        email: "test@email.com",
        img: userImage,
        role: "admin",
    }
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
          <span className="font-600 text-2xl text-white">TaskMate</span>
        </div>
        {/* middle */}
        <div>
          <ul className="flex gap-8 mt-4">
            <li className="text-white text-lg font-500 flex items-center gap-x-1">
              <FaClipboardList /> Task{" "}
            </li>
            <li className="text-white text-lg font-500 flex items-center gap-x-1">
              <PiSpinnerGapFill /> Spin
            </li>
          </ul>
        </div>
        {/* user data part */}
        <div className="flex items-center gap-4 text-2xl text-white font-500">
            <div className="w-[50px]  h-[50px] rounded-full"><Image
            alt="user"
            src={user?.img}
            
            />
            </div>
            <h1 className="text-white font-medium text-2xl">{user?.name}</h1>
            <MdOutlineArrowDropDown />

        </div>
      </div>
    </div>
  );
}
