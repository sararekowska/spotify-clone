import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
  // Token will exist if user is logged in
  // @ts-ignore
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  const { pathname } = req.nextUrl

  // Allow the request if the following is true
  // 1) the token exists
  // 2) It's a request for next-auth session & provider fetching

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Otherwise, redirect to the login page (if they don't have token and are requesting a protected route)
  if (!token || pathname !== '/login') {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.rewrite(url)
  }
}
