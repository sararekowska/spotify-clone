import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string
      refreshToken?: string
      username?: string
      image?: string
      name?: string
    }
  }
  interface Account {
    expires_at: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    username?: string
    accessTokenExpires?: number
  }
}
