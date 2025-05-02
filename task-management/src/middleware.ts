import { NextResponse } from 'next/server'

export const middleware = (request:Request) => {
  
  const cookies = request.headers.get('cookie')?.split('; ').find(cookie => cookie.startsWith('auth_token='))?.split('=')[1];
  if (cookies) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  return NextResponse.next()
}


export const config = {
  matcher: ['/']
}