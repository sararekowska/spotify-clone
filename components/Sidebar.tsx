import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  HeartIcon,
  LogoutIcon,
} from '@heroicons/react/outline'
import { signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session, status } = useSession()
  console.log(session, status)

  return (
    <section className="h-screen overflow-y-scroll border-r border-gray-900 p-5 text-gray-500 scrollbar-hide ">
      <div className="space-y-3">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-5 w-5" />
          <p>Log out</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* playlists */}
        <p className="cursor-pointer hover:text-white">Playlist name...</p>
      </div>
    </section>
  )
}

export default Sidebar
