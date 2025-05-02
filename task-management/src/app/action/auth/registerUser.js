"use server";
import bcrypt from "bcrypt";

export const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const res = await fetch(
    "https://task-management-server-alpha-two.vercel.app/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );
  const data = await res.json();
  console.log(data);
  if (res.status === 200) {
    return data;
  } else {
    throw new Error(data.message || "Something went wrong");
  }
};
