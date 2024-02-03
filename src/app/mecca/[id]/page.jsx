'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Mecca({ params }) {
  const [mecca, setMecca] = useState({
    mecca_id: null,
    anime_id: null,
    title: '',
    episode: '',
    scene: '',
    mecca_name: '',
    about: '',
    place_id: null,
    prefecture: '',
    images: [],
    username: '',
    is_author: null,
    is_favorite: null,
  })
  const [place, setPlace] = useState()
  const [address, setAddress] = useState()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const router = useRouter()

  useEffect(() => {
    fetch(`${apiUrl}/meccas/${params.id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setMecca({
          mecca_id: data.id,
          anime_id: data.anime_id,
          title: data.title,
          episode: data.episode,
          scene: data.scene,
          mecca_name: data.mecca_name,
          about: data.about,
          place_id: data.place_id,
          prefecture: data.prefecture,
          images: data.images,
          // username: 'test',
          // is_author: '登録者かどうか',
          // is_favorite: 'お気に入り登録しているかどうか',
        })
      })
  }, [params.id])

  useEffect(() => {
    if (mecca.place_id === null) return

    fetch(`/api/map/getinfo-byid?id=${mecca.place_id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPlace(data.displayName.text)
        setAddress(data.formattedAddress)
      })
  }, [mecca])

  return (
    <div className="relative m-auto w-[1100px] gap-20 border border-gray-800 bg-white p-14">
      <div className="absolute right-[56px] flex cursor-pointer flex-col items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="#ed5871"
          class="bi bi-suit-heart-fill"
          viewBox="0 0 16 16"
        >
          <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
        </svg>
        <p className="mt-1 text-[12px]">行きたい</p>
      </div>
      <h2 className="text-[24px]">{mecca.title}</h2>
      <p className="mb-4 text-[18px]">{`第${mecca.episode}話 ${mecca.scene}`}</p>
      <h1 className="text-[28px]">{mecca.mecca_name}</h1>
      <div className="mb-6 flex items-center">
        <p className="mr-6 text-[20px]">{place}</p>
        <p className="text-[16px]">{address && address.split(' ')[1]}</p>
      </div>
      <p className="mb-4 text-[14px]">{mecca.about}</p>
      <div className="flex">
        {mecca.images &&
          mecca.images.length !== 0 &&
          mecca.images.map((image, index) => {
            return (
              <img
                src={image.path.url}
                alt=""
                key={index}
                className="mr-2 w-[400px]"
              />
            )
          })}
      </div>
      <div className="flex items-center justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="#bc79f7"
          class="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fill-rule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
        <p className="ml-2 text-[14px]">{mecca.username} さん</p>
      </div>
      <button onClick={() => router.back()} className="your-custom-styles">
        戻る
      </button>
    </div>
  )
}
