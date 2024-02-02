'use client'

import MapPrefecture from '@/features/map/components/MapPrefecture'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Prefecture({ params }) {
  const [meccas, setMeccas] = useState([])
  const [placeIds, setPlaceIds] = useState([])
  const [places, setPlaces] = useState([])
  const [selectedIndex, setSelectedIndex] = useState()

  const scrollContainerRef = useRef(null)
  const selectedItemRef = useRef(null)

  useEffect(() => {
    getMeccasByPrefecture()
  }, [params.prefecture])

  useEffect(() => {
    getPlacesInfo()
  }, [meccas])

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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const prefecture = decodeURIComponent(params.prefecture)

  async function getMeccasByPrefecture() {
    // const token = await getCookie('token')
    // const res = await fetch(
    //   `${apiUrl}/prefecture/${encodeURIComponent(params.prefecture)}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   },
    // )
    // const data = await res.json()
    const meccasDummy = [
      {
        mecca_id: '1',
        anime_id: 'アニメID',
        title: 'あの日見た花の名前を僕達はまだ知らない。1',
        episode: '2',
        scene: '12:34',
        mecca_name: '第2話で○○が働いていたカフェ',
        about:
          '○○が働いていたカフェのモデルになったお店らしいです。ケーキがおいしくて、特にモンブランが有名で土日にはいつも人がたくさん来ています。○○が働いていたカフェのモデルになったお店らしいです。',
        place_id: 'ChIJ8T1GpMGOGGARDYGSgpooDWw',
        prefecture: '都道府県名',
        photos: ['画像のパス1', '画像のパス2', '画像のパス3'],
        username: 'test',
        is_author: '登録者かどうか',
        is_favorite: 'お気に入り登録しているかどうか',
      },
      {
        mecca_id: '2',
        anime_id: 'アニメID',
        title: 'あの日見た花の名前を僕達はまだ知らない。2',
        episode: '2',
        scene: '12:34',
        mecca_name: '第2話で○○が働いていたカフェ',
        about:
          '○○が働いていたカフェのモデルになったお店らしいです。ケーキがおいしくて、特にモンブランが有名で土日にはいつも人がたくさん来ています。○○が働いていたカフェのモデルになったお店らしいです。',
        place_id: 'ChIJ0evuTo7xGGARfjgAu3epb6w',
        prefecture: '都道府県名',
        photos: ['画像のパス1', '画像のパス2', '画像のパス3'],
        username: 'test',
        is_author: '登録者かどうか',
        is_favorite: 'お気に入り登録しているかどうか',
      },
      {
        mecca_id: '3',
        anime_id: 'アニメID',
        title: 'あの日見た花の名前を僕達はまだ知らない。3',
        episode: '2',
        scene: '12:34',
        mecca_name: '第2話で○○が働いていたカフェ',
        about:
          '○○が働いていたカフェのモデルになったお店らしいです。ケーキがおいしくて、特にモンブランが有名で土日にはいつも人がたくさん来ています。○○が働いていたカフェのモデルになったお店らしいです。',
        place_id: 'ChIJBZZvCI7xGGARR5Bi5Pt1tyw',
        prefecture: '都道府県名',
        photos: ['画像のパス1', '画像のパス2', '画像のパス3'],
        username: 'test',
        is_author: '登録者かどうか',
        is_favorite: 'お気に入り登録しているかどうか',
      },
      {
        mecca_id: '4',
        anime_id: 'アニメID',
        title: 'あの日見た花の名前を僕達はまだ知らない。4',
        episode: '2',
        scene: '12:34',
        mecca_name: '第2話で○○が働いていたカフェ',
        about:
          '○○が働いていたカフェのモデルになったお店らしいです。ケーキがおいしくて、特にモンブランが有名で土日にはいつも人がたくさん来ています。○○が働いていたカフェのモデルになったお店らしいです。',
        place_id: 'ChIJBZZvCI7xGGARR5Bi5Pt1tyw',
        prefecture: '都道府県名',
        photos: ['画像のパス1', '画像のパス2', '画像のパス3'],
        username: 'test',
        is_author: '登録者かどうか',
        is_favorite: 'お気に入り登録しているかどうか',
      },
      {
        mecca_id: '5',
        anime_id: 'アニメID',
        title: 'あの日見た花の名前を僕達はまだ知らない。5',
        episode: '2',
        scene: '12:34',
        mecca_name: '第2話で○○が働いていたカフェ',
        about:
          '○○が働いていたカフェのモデルになったお店らしいです。ケーキがおいしくて、特にモンブランが有名で土日にはいつも人がたくさん来ています。○○が働いていたカフェのモデルになったお店らしいです。',
        place_id: 'ChIJBZZvCI7xGGARR5Bi5Pt1tyw',
        prefecture: '都道府県名',
        photos: ['画像のパス1', '画像のパス2', '画像のパス3'],
        username: 'test',
        is_author: '登録者かどうか',
        is_favorite: 'お気に入り登録しているかどうか',
      },
    ]
    // setMeccas(data.meccas)
    // setPlaceIds(
    //   data.meccas.map((mecca) => {
    //     return mecca.place_id
    //   }),
    // )
    setMeccas(meccasDummy)
    setPlaceIds(
      meccasDummy.map((mecca) => {
        return mecca.place_id
      }),
    )
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

  return (
    <div className="flex">
      <div>
        <h1>
          {prefecture}
          <span>の聖地一覧</span>
        </h1>
        <MapPrefecture
          places={places}
          prefecture={params.prefecture}
          handleSelectedPlaceIndex={handleSelectedPlaceIndex}
        />
      </div>
      <div
        style={{ height: '300px', width: '300px', border: '1px solid' }}
        className="overflow-y-auto"
        ref={scrollContainerRef}
      >
        {meccas.length !== 0 &&
          meccas.map((mecca, index) => {
            const isSpecialIndex = index === selectedIndex
            const itemStyle = isSpecialIndex
              ? 'border-b border-gray-600 p-5 bg-yellow-100'
              : 'border-b border-gray-600 p-5'

            return (
              <div
                key={index}
                className={itemStyle}
                ref={isSpecialIndex ? selectedItemRef : null}
              >
                <Link href={`/mecca/${mecca.mecca_id}`}>
                  <h2>{mecca.title}</h2>
                  <p>{mecca.mecca_name}</p>
                  {places.length !== 0 && (
                    <div className="flex">
                      <p>{places[index].displayName.text}</p>
                      <p>{places[index].formattedAddress.split(' ')[1]}</p>
                    </div>
                  )}
                  <p>{mecca.about}</p>
                </Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}
