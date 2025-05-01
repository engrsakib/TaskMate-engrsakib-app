import Spinner from "@/component/auth/dashboard/Spinner";
import React from "react";

export default function dashboardPage() {
  return (
    <div className="bg-white w-[90%] mx-auto h-screen border-transparent rounded-2xl drop-shadow-2xl">
      <div className="flex justify-between max-sm:flex-col items-center p-4">
        <h1 className="font-bold text-2xl">Spin Wheel</h1>
        <select defaultValue="Pick an OS" className="select select-warning">
          <option disabled={true}>Pick an OS</option>
          <option>Windows</option>
          <option>MacOS</option>
          <option>Linux</option>
        </select>
      </div>
      {/* spiner */}
      <div>
        <Spinner></Spinner>
      </div>
    </div>
  );
}
