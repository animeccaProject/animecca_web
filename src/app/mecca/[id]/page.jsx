'use client'

import { getCookie } from '@/utils/cookies'
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
    place_id: '',
    prefecture: '',
    images: [],
    username: '',
    is_author: null,
  })
  const [place, setPlace] = useState()
  const [address, setAddress] = useState()
  const [favorite, setFavorite] = useState()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  useEffect(() => {
    getMecca()
  }, [params.id])

  async function getMecca() {
    const token = await getCookie('token')
    const res = await fetch(`${apiUrl}/meccas/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    // 確認用
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
      is_author: data.is_author,
      username: data.username,
    })
    setFavorite(data.is_favorites)
  }

  useEffect(() => {
    if (mecca.place_id === '') return

    fetch(`/api/map/getinfo-byid?id=${mecca.place_id}`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setPlace(data.displayName.text)
        setAddress(data.formattedAddress)
      })
  }, [mecca])

  const switchFavorite = async () => {
    const isFavorite = favorite

    // ステートを更新してUIを即時反映
    setFavorite((prev) => !prev)
    const token = await getCookie('token')
    // お気に入りの状態をサーバーに送信する
    const method = isFavorite ? 'DELETE' : 'POST' // お気に入り解除の場合はDELETE、追加の場合はPOST
    const res = await fetch(`${apiUrl}/meccas/${mecca.mecca_id}/favorites`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      // エラーハンドリング
      console.error('お気に入りの状態の更新に失敗しました')
      // ステートをロールバック
      setFavorite((prev) => prev)
    }
  }

  async function deleteMecca() {
    const token = await getCookie('token')
    const res = await fetch(`${apiUrl}/meccas/${mecca.mecca_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(res)
    if (!res.ok) {
      //エラー処理
    } else {
      router.back()
    }
  }

  return (
    <div className="relative m-auto w-[1100px] gap-20 border border-gray-800 bg-white p-14">
      <div
        className="absolute right-[56px] flex cursor-pointer flex-col items-center"
        onClick={() => {
          switchFavorite()
        }}
      >
        {favorite ? (
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            fill="gray"
            class="bi bi-suit-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
          </svg>
        )}
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
      <div className="flex justify-between">
        <div>
          <div
            onClick={() => router.back()}
            className="flex cursor-pointer text-[14px]"
          >
            {/* <Link
            href={`/prefecture/${mecca.prefecture}`}
          > */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-arrow-left-circle"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
              />
            </svg>
            <span className="ml-2">一覧に戻る</span>
            {/* </Link> */}
          </div>
        </div>
        {mecca.is_author && (
          <div className="mt-4 flex justify-end gap-4">
            <button className="border border-gray-600 px-4 py-2 text-[14px] text-gray-600">
              編集
            </button>
            <button
              onClick={deleteMecca}
              className="bold border border-red-400 px-4 py-2 text-[14px] text-red-400"
            >
              削除
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
