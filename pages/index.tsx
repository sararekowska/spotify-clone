import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Center } from '../components/Center'
import Sidebar from '../components/Sidebar'

const Home: NextPage = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <Head>
        <title>Spotify clone</title>
        <link rel="icon" href="https://i.imgur.com/fPuEa9V.png" />
      </Head>

      <main className="flex">
        <Sidebar />
        <Center />
      </main>

      <div>{/* player */}</div>
    </div>
  )
}

export default Home
