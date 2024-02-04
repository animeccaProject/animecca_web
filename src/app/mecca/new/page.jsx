'use client'

import Map from '@/features/map/components/Map'
import { getCookie } from '@/utils/cookies'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function New() {
  const [animeId, setAnimeId] = useState('')
  const [title, setTitle] = useState('')
  const [episode, setEpisode] = useState('')
  const [sceneSeconds, setSceneSeconds] = useState('')
  const [meccaName, setMeccaName] = useState('')
  const [about, setAbout] = useState('')
  const [placeId, setPlaceId] = useState('')
  const [prefecture, setPrefecture] = useState('')
  const [images, setImages] = useState(null)

  const [titleOptions, setTitleOptions] = useState([])
  const [episodes, setEpisodes] = useState()
  const [episodesArray, setEpisodesArray] = useState([])
  const [episodesCount, setEpisodesCount] = useState()
  const [placeName, setPlaceName] = useState('')
  const [places, setPlaces] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const closeModal = () => setIsModalOpen(false)

  useEffect(() => {
    if (episodesCount > 0) {
      makeEpisodes()
    }
  }, [episodesCount])

  const router = useRouter()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // const episodesArray = []

  function makeEpisodes() {
    const episodes = []
    for (let i = 1; i <= episodesCount; i++) {
      episodes.push(i)
    }
    setEpisodesArray(episodes)
  }

  const inputWrapperStyle = 'flex items-end border-b border-gray-800 pt-6'
  const inputTitleStyle = 'mb-2 mr-5 font-semibold text-[15px]'
  const inputStyle = 'border-gray-400 focus:outline-none h-[40px] w-[600px]'

  function formatScene(seconds) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  async function getAnnimeInfo() {
    const res = await fetch(
      `https://api.annict.com/v1/works?filter_title=${title}&fields=id,title,episodes_count&per_page=5&access_token=0oxwKJmy3jG3S5De80O4Xazyomz35ptdnyQ7WpbAkrE`,
    )
    const { works } = await res.json()
    console.log(works)
    setTitleOptions(works)
  }

  async function getInfoByPlace() {
    if (!placeName) {
      return
    }

    const res = await fetch(`/api/map/getinfo-byplace?place=${placeName}`)
    const { places } = await res.json()
    setPlaces(places)
    // 確認用
    console.log(places)

    setIsModalOpen(true)
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

  async function postMecca(e) {
    e.preventDefault()

    const mecca = new FormData()

    mecca.append(
      'mecca',
      JSON.stringify({
        anime_id: animeId,
        title,
        episode,
        scene: formatScene(sceneSeconds),
        mecca_name: meccaName,
        about,
        place_id: placeId,
        prefecture,
      }),
    )

    if (images) {
      for (let i = 0; i < images.length; i++) {
        mecca.append(`images[${i}]`, images[i])
      }
    }

    // 確認用
    for (let [key, value] of mecca.entries()) {
      console.log(`${key}: ${value}`)
    }

    const token = await getCookie('token')
    const res = await fetch(`${apiUrl}/meccas`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: mecca,
    })

    const data = await res.json()
    console.log(data)
    if (res.ok) {
      router.push(`/mecca/${data.id}`)
    } else {
      //エラー処理
    }
  }

  return (
    <div className="m-auto h-[640px] w-[1100px] border border-gray-800 bg-white px-14 py-10">
      <div>
        <h1 className="ml-5 text-[28px]">聖地の登録</h1>
        <form onSubmit={postMecca} className="m-auto w-[800px]">
          <div className={`${inputWrapperStyle} relative`}>
            <p className={inputTitleStyle}>作品名</p>
            <input
              type="text"
              placeholder=""
              className={inputStyle}
              onChange={(e) => {
                setTitle(e.target.value)
                getAnnimeInfo(e.target.value)
              }}
              value={title}
            />
            {titleOptions.length !== 0 && (
              <div className="absolute top-[70px] bg-white px-3 py-2 text-[14px] shadow shadow-gray-500">
                {titleOptions.map((titleOption, index) => {
                  return (
                    <div
                      key={index}
                      className="cursor-pointer py-1.5"
                      onClick={() => {
                        setTitle(titleOption.title)
                        setAnimeId(titleOption.id)
                        setEpisodesCount(titleOption.episodes_count)
                        setTitleOptions([])
                        makeEpisodes()
                      }}
                    >
                      {titleOption.title}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <div className="mt-6 flex items-center gap-12">
            <div className="flex items-center border-b border-gray-800">
              <p className="mr-6 text-[14px] font-semibold">話数</p>
              <select
                onChange={(e) => {
                  setEpisode(e.target.value)
                }}
                className="px-4 py-1"
              >
                {episodesArray.length !== 0 &&
                  episodesArray.map((episode) => {
                    return (
                      <option key={episode} value={episode}>
                        {episode}
                      </option>
                    )
                  })}
              </select>
            </div>
            <div className="flex items-center">
              <p className="mr-4 text-[14px] font-semibold">シーン(秒数)</p>
              <input
                type="range"
                min={0}
                max={10800}
                onChange={(e) => {
                  setSceneSeconds(e.target.value)
                }}
                className="w-[250px]"
              />
              <span className="ml-2 tracking-wider">
                {formatScene(sceneSeconds)}
              </span>
            </div>
          </div>
          <div className={inputWrapperStyle}>
            <p className={inputTitleStyle}>聖地名</p>
            <input
              type="text"
              placeholder=""
              className={inputStyle}
              onChange={(e) => {
                setMeccaName(e.target.value)
              }}
            />
          </div>
          <div className={inputWrapperStyle}>
            <p className={inputTitleStyle}>場所</p>
            <input
              type="text"
              placeholder="施設名や町の名前を入力して、検索ボタンをクリックしてください"
              className={`${inputStyle} placeholder:text-[14px]`}
              onChange={(e) => {
                setPlaceName(e.target.value)
              }}
              value={placeName}
            />
            <div className="mb-2.5 cursor-pointer" onClick={getInfoByPlace}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          <div className="flex items-start border-b border-gray-800 pt-6">
            <p className={inputTitleStyle}>概要</p>
            <textarea
              rows="3"
              placeholder=""
              className={`${inputStyle} h-[80px] resize-none`}
              onChange={(e) => {
                setAbout(e.target.value)
              }}
            />
          </div>
          <div className={inputWrapperStyle}>
            <p className={inputTitleStyle}>画像</p>
            <input
              type="file"
              multiple
              placeholder=""
              className={inputStyle}
              onChange={(e) => {
                setImages(e.target.files)
              }}
            />
          </div>
          <div className="mt-8 flex justify-end gap-7">
            <button
              onClick={() => router.back()}
              className="border border-gray-600 px-4 py-2 text-[14px] text-gray-600"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="border border-gray-800 bg-[#69cefa] px-10 py-2.5 text-[14px] font-semibold"
            >
              登録
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <div className="modal-backdrop">
          <Map
            places={places}
            handleSelectedPlace={handleSelectedPlace}
            onClose={closeModal}
          />
          <style jsx>{`
            .modal-backdrop {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
