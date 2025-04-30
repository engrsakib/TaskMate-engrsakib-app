import React from "react";
import task from "@/assets/images/task.png";
import Image from "next/image";
import LogInFrom from "@/component/auth/LogInFrom";
import Head from "next/head";

const Login = () => {
  return (
   <>
    <Head>
        <title>LogIn | MyApp</title>
        <meta name="description" content="Learn more about our company." />
      </Head>

     <div className="grid grid-cols-12">
      {/* left side */}
      <div className="w-full lg:h-screen lg:col-span-5 col-span-12 flex justify-center items-center bg-linear-120 from-[rgb(45,102,86)] to-[rgb(5,6,18)]">
        <Image src={task} alt="task" className="object-cover mx-auto"/>
      </div>
      {/* right side */}
      <div className="lg:col-span-7 w-10/12 mx-auto col-span-12 flex justify-center items-center bg-white">
        <LogInFrom></LogInFrom>
      </div>
    </div>
   
   
   </>
  );
};

export default Login;
