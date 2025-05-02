'use server'
import bcrypt from "bcrypt";
export const logInUser = async (userData) => {  
  const { email, password } = userData;
  const res = await fetch(`http://localhost:5000/user/login/${email}`, {
    next: { revalidate: 10 },
  });
  const user = await res.json();
 
  // console.log(user)
  
  if(!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if(!isPasswordValid) {
    return null;
  }
  
  
    return user;
  
}