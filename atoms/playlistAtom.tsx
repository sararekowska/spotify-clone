/// <reference path="../node_modules/@types/spotify-api/index.d.ts" />
import { atom } from 'recoil'

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '0m9SGxcMfDgSX82gpVQgYs',
})

export const playlistState = atom<SpotifyApi.SinglePlaylistResponse>({
  key: 'playlistState',
  //@ts-ignore
  default: null,
})
