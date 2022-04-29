import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentTrackIdState } from '../../atoms/songAtom'
import { useSpotify } from './useSpotify'

type SongInfo = {
  album: {
    images: { url: string }[]
  }
  name: string
  artists: { name: string }[]
}

const useSongInfo = () => {
  const spotifyApi = useSpotify()
  const [currentTrackId] = useRecoilState(currentTrackIdState)
  const [songInfo, setSongInfo] = useState<SongInfo>()

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: {
              Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
            },
          }
        ).then((res) => res.json())

        setSongInfo(trackInfo)
      }
    }
    fetchSongInfo()
  }, [currentTrackId, spotifyApi])

  return songInfo
}

export default useSongInfo
