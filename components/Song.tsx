import { useRecoilState } from 'recoil'
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom'
import { useSpotify } from '../common/hooks/useSpotify'

type Song = {
  order: number
  track: SpotifyApi.PlaylistTrackObject
}

const msToMinutes = (millis: number) => {
  var minutes = Math.floor(millis / 60000)
  var seconds = parseInt(((millis % 60000) / 1000).toFixed(0))
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

const Song = (props: Song) => {
  const spotifyApi = useSpotify()
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
  const ms = props.track.track.duration_ms
  const time = msToMinutes(ms)

  const playSong = () => {
    setCurrentTrackId(props.track.track.id)
    setIsPlaying(true)
    spotifyApi.play({
      uris: [props.track.track.uri],
    })
  }

  return (
    <section
      className="grid cursor-pointer grid-cols-2 rounded-lg py-3 px-3 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{props.order + 1}</p>
        <img
          className="h-10 w-10"
          src={props.track.track.album.images[0].url}
          alt="track image"
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">
            {props.track.track.name}
          </p>
          <p className="">{props.track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden md:inline">{props.track.track.album.name}</p>
        <p>{time}</p>
      </div>
    </section>
  )
}

export default Song
