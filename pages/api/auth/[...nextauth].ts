import NextAuth, { Account } from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import spotifyApi, { LOGIN_URL } from '../../../common/spotify'

const refreshAccessToken = async (token: any, account: Account | undefined) => {
  try {
    if (account?.access_token && account?.refresh_token) {
      spotifyApi.setAccessToken(account.access_token)
      spotifyApi.setRefreshToken(account.refresh_token)

      const { body: refreshedToken } = await spotifyApi.refreshAccessToken()
      console.log('Refreshed token:', refreshedToken)

      return {
        ...token,
        accessToken: refreshedToken.access_token,
        accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
        refreshedToken: refreshedToken.refresh_token ?? token.refreshedToken,
      }
    }
  } catch (error) {
    console.error(error)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      //initial sign in
      const accessTokenExpires = account?.expires_at
        ? account.expires_at * 1000
        : null

      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires,
        }
      }

      // Return previous token if the access token has not expired yet
      if (accessTokenExpires && Date.now() < accessTokenExpires) {
        console.log("access token hasn't expired yet")
        return token
      }

      // access token has expired, refresh it
      console.log('access token has expired, refreshing')
      return await refreshAccessToken(token, account)
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      session.username = token.username

      return session
    },
  },
})
