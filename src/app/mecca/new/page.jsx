'use client'

import Map from '@/features/map/components/Map'
import { getCookie } from '@/utils/cookies'
import { useState } from 'react'

export default function New() {
  const [animeId, setAnimeId] = useState('')
  const [title, setTitle] = useState('')
  const [episode, setEpisode] = useState('')
  const [sceneSeconds, setSceneSeconds] = useState('')
  const [meccaName, setMeccaName] = useState('')
  const [about, setAbout] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [prefecture, setPrefecture] = useState('')
  const [photos, setPhotos] = useState([])

  const [placeName, setPlaceName] = useState('')
  const [places, setPlaces] = useState([])

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const inputStyle = 'border-b border-gray-400 focus:outline-none'

  async function getInfoByPlace() {
    const res = await fetch(`/api/map/getinfo-byplace?place=${placeName}`)
    const { places } = await res.json()
    setPlaces(places)
    // 確認用
    console.log(places)
  }

  function formatScene(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  async function postMecca(e) {
    e.preventDefault()

    const scene = formatScene(sceneSeconds)
    const mecca = {
      mecca: {
        anime_id: 1,
        title,
        episode,
        scene,
        mecca_name: meccaName,
        about,
        place_id: placeId,
        prefecture,
        // photos: ['画像のパス1', '画像のパス2', '画像のパス3'],
        // user_id: 5,
      },
    }

    // 確認用
    console.log(mecca)

    const token = await getCookie('token')
    const res = await fetch(`${apiUrl}/meccas`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(mecca),
    })

    const data = await res.json()
    if (res.ok) {
      router.push(`/mecca/${data.mecca.mecca_id}`)
    } else {
      //エラー処理
    }
  }

  function handleSelectedPlace(place) {
    // 都道府県名の取得
    const prefectureComponent = place.addressComponents.find((component) =>
      component.types.includes('administrative_area_level_1'),
    )
    const prefecture = prefectureComponent ? prefectureComponent.longText : null

    setPlaceName(place.displayName.text)
    setPlaceId(place.id)
    setPrefecture(prefecture)
  }

  return (
    <>
      <h1 className="text-2xl">聖地の登録</h1>
      <form onSubmit={postMecca}>
        <div className="flex">
          <p>作品名</p>
          <input
            type="text"
            placeholder=""
            className={inputStyle}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
        </div>
        <div className="flex">
          <p>話数</p>
          <input
            type="number"
            placeholder=""
            className={inputStyle}
            onChange={(e) => {
              setEpisode(e.target.value)
            }}
          />
        </div>
        <div className="flex">
          <p>シーン(秒数)</p>
          <input
            type="range"
            min={0}
            max={10800}
            onChange={(e) => {
              setSceneSeconds(e.target.value)
            }}
          />
          <span>{formatScene(sceneSeconds)}</span>
        </div>
        <div className="flex">
          <p>聖地名</p>
          <input
            type="text"
            placeholder=""
            className={inputStyle}
            onChange={(e) => {
              setMeccaName(e.target.value)
            }}
          />
        </div>
        <div className="flex">
          <p>場所</p>
          <input
            type="text"
            placeholder=""
            className={inputStyle}
            onChange={(e) => {
              setPlaceName(e.target.value)
            }}
            value={placeName}
          />
          <div onClick={getInfoByPlace}>検索</div>
        </div>
        <div className="flex">
          <p>概要</p>
          <input
            type="text"
            placeholder=""
            className={inputStyle}
            onChange={(e) => {
              setAbout(e.target.value)
            }}
          />
        </div>
        <div className="flex">
          <p>画像</p>
          <input type="text" placeholder="" className={inputStyle} />
        </div>
        <button type="submit" className="bg-gray-300">
          登録
        </button>
      </form>
      <Map places={places} handleSelectedPlace={handleSelectedPlace} />
    </>
  )
}
