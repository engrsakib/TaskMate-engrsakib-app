import NextAuth from "next-auth"

const handler = NextAuth({
  // Add your NextAuth configuration here
  providers: [],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }