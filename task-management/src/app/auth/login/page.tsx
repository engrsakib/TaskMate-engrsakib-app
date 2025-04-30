import React from "react";
import task from "@/assets/images/task.png";
import Image from "next/image";
import LogInFrom from "@/component/auth/LogInFrom";
const Login = () => {
  return (
    <div className="grid grid-cols-12">
      {/* left side */}
      <div className="w-full h-screen col-span-5 flex justify-center items-center bg-linear-120 from-[rgb(45,102,86)] to-[rgb(5,6,18)]">
        <Image src={task} alt="task" className="object-cover mx-auto"/>
      </div>
      {/* right side */}
      <div className="col-span-7 flex justify-center items-center bg-white">
        <LogInFrom></LogInFrom>
      </div>
    </div>
  );
};

export default Login;
