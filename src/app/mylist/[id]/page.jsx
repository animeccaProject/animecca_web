'use client'

import MapUser from '@/features/map/components/MapUser'
import { getCookie } from '@/utils/cookies'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Mylist({ params }) {
  const [meccas, setMeccas] = useState([])
  const [placeIds, setPlaceIds] = useState([])
  const [places, setPlaces] = useState([])
  const [selectedIndex, setSelectedIndex] = useState()
  const [favorites, setFavorites] = useState({})
  const [username, setUsername] = useState('ゲスト')

  const scrollContainerRef = useRef(null)
  const selectedItemRef = useRef(null)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  // useEffect(() => {
  //   getMeccasByUser()
  //   getUsername()
  // }, [params.id])

  useEffect(() => {
    getMeccasByUser()
    getUsername()
  }, [])

  useEffect(() => {
    getPlacesInfo()
  }, [meccas])

  async function getUsername() {
    const name = await getCookie('username')
    if (name) {
      setUsername(name)
    }
  }

  useEffect(() => {
    if (selectedItemRef.current && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top:
          selectedItemRef.current.offsetTop -
          scrollContainerRef.current.offsetTop,
        behavior: 'smooth',
      })
    }
  }, [selectedIndex])

  async function getMeccasByUser() {
    const token = await getCookie('token')
    const res = await fetch(`${apiUrl}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    // 確認用
    console.log(data)

    setMeccas(data)
    setPlaceIds(
      data.map((mecca) => {
        return mecca.place_id
      }),
    )

    const initialFavorites = data.reduce((acc, mecca) => {
      acc[mecca.id] = true
      return acc
    }, {})
    // 確認用
    console.log(initialFavorites)
    setFavorites(initialFavorites)
  }

  async function getPlacesInfo() {
    if (placeIds.length === 0) return

    const fetchPromises = placeIds.map((placeId) =>
      fetch(`/api/map/getinfo-byid?id=${placeId}`).then((res) => res.json()),
    )
    const results = await Promise.all(fetchPromises)
    setPlaces(results)
  }

  function handleSelectedPlaceIndex(index) {
    setSelectedIndex(index)
  }

  const switchFavorite = async (meccaId) => {
    const isFavorite = favorites[meccaId]

    // ステートを更新してUIを即時反映
    setFavorites((prev) => ({ ...prev, [meccaId]: !isFavorite }))
    const token = await getCookie('token')
    // お気に入りの状態をサーバーに送信する
    const method = isFavorite ? 'DELETE' : 'POST' // お気に入り解除の場合はDELETE、追加の場合はPOST
    const res = await fetch(`${apiUrl}/meccas/${meccaId}/favorites`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) {
      // エラーハンドリング
      console.error('お気に入りの状態の更新に失敗しました')
      // ステートをロールバック
      setFavorites((prev) => ({ ...prev, [meccaId]: isFavorite }))
    }
  }

  return (
    <div className="m-auto flex h-[640px] w-[1100px] gap-20 border border-gray-800 bg-white p-14">
      <div>
        <h1 className="mb-10">
          <span className="pr-1 text-[32px]">{username}</span>
          <span className="pr-1 text-[20px]">さんのマイリスト</span>
        </h1>
        <MapUser
          places={places}
          handleSelectedPlaceIndex={handleSelectedPlaceIndex}
        />
      </div>
      <div
        className="scrollable w-[370px] overflow-y-auto"
        ref={scrollContainerRef}
      >
        {meccas.length !== 0 &&
          meccas.map((mecca, index) => {
            const isSpecialIndex = index === selectedIndex
            const itemStyle = isSpecialIndex
              ? 'underline decoration-[#d6d6d6] underline-offset-[6px] decoration-4'
              : ''
            return (
              <div
                key={index}
                className="border-b border-gray-600 p-5"
                ref={isSpecialIndex ? selectedItemRef : null}
              >
                <div className="flex justify-between gap-3">
                  <h2 className={`${itemStyle} mb-3 text-[22px]`}>
                    {mecca.title}
                  </h2>
                  <div
                    className="mb-1 flex justify-end"
                    onClick={() => {
                      switchFavorite(mecca.id)
                    }}
                  >
                    {favorites[mecca.id] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="#ed5871"
                        class="bi bi-suit-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="gray"
                        class="bi bi-suit-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z" />
                      </svg>
                    )}
                  </div>
                </div>
                <Link href={`/mecca/${mecca.id}`}>
                  <h3 className={`${itemStyle} mb-3 text-[20px]`}>
                    {mecca.mecca_name}
                  </h3>
                  {places.length !== 0 && (
                    <div className="mb-3">
                      <p>{places[index].displayName.text}</p>
                      <p className="text-[14px]">
                        {places[index].formattedAddress.split(' ')[1]}
                      </p>
                    </div>
                  )}
                  <div className="flex items-end justify-between gap-3">
                    <p className="ellipsismulti w-[370px] text-[13px] text-gray-500">
                      {mecca.about}
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="#3b3b3b"
                      class="bi bi-arrow-right-circle"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                      />
                    </svg>
                  </div>
                  <img src={mecca.images[0].path.url}></img>
                  <div>{mecca.username}さん</div>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}
