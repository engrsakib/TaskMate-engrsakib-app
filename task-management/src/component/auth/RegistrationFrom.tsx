"use client";
import React, { useState, useMemo } from "react";
import Swal from "sweetalert2";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import { registerUser } from "@/app/action/auth/registerUser";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  
  const router = useRouter();
  // Password strength scoring
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    switch (score) {
      case 5:
        return "Too Strong";
      case 4:
        return "Strong";
      case 3:
        return "Medium";
      case 2:
        return "Weak";
      default:
        return "Too Weak";
    }
  }, [password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match.",
      });
    }
    if (strength === "Too Weak" || strength === "Weak") {
      return Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Choose a stronger password.",
      });
    }
   
      const isSuccess = await registerUser({ firstName, lastName, email, password });
      if (isSuccess.acknowledged == true && isSuccess.insertedId) {
        router.push("/dashboard/auth/login");
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Registration successful!",
        });
      }else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: isSuccess.message,
        });
      }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-4xl font-semibold text-center">Register</h1>
      <h2 className="text-gray-600 text-center mt-2">
        To Create Account, Please Fill In The Details Below.
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <input
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <div className="relative">
          <input
            type={showPwd ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border px-3 py-2 rounded pr-10 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPwd((v) => !v)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-600"
          >
            {showPwd ? <AiFillEyeInvisible /> : <AiFillEye />}
          </button>
        </div>

        {password && (
          <div className="text-sm">
            Strength:{" "}
            <span
              className={
                strength === "Too Strong"
                  ? "text-green-700"
                  : strength === "Strong"
                  ? "text-green-500"
                  : strength === "Medium"
                  ? "text-yellow-500"
                  : strength === "Weak"
                  ? "text-orange-500"
                  : "text-red-500"
              }
            >
              {strength}
            </span>
          </div>
        )}

        <input
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm Password"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-[rgb(86,296,229)] text-black py-2 rounded hover:bg-[rgb(78,228,203)] disabled:opacity-50 transition"
        >
          Register
        </button>
        <div className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
