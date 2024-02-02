'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Prefecture({ params }) {
  const [meccas, setMeccas] = useState([])
  const [placeIds, setPlaceIds] = useState([])
  const [placeInfos, setPlaceInfos] = useState([])

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const prefecture = decodeURIComponent(params.prefecture)

  useEffect(() => {
    getMeccasByPrefecture()
  }, [params.prefecture])

  useEffect(() => {
    getPlaceInfo()
  }, [meccas])

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
    // setMeccas(data.meccas)
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
    setMeccas(meccasDummy)
    setPlaceIds(
      meccasDummy.map((mecca) => {
        return mecca.place_id
      }),
    )
  }

  async function getPlaceInfo() {
    if (placeIds.length === 0) return

    const fetchPromises = placeIds.map((placeId) =>
      fetch(`/api/map/getinfo-byid?id=${placeId}`).then((res) => res.json()),
    )
    const results = await Promise.all(fetchPromises)
    console.log(results)
    setPlaceInfos(results)
  }

  return (
    <div className="flex">
      <div>
        <h1>
          {prefecture}
          <span>の聖地一覧</span>
        </h1>
        <div style={{ height: '300px', width: '300px', border: '1px solid' }}>
          地図
        </div>
      </div>
      <div
        style={{ height: '300px', width: '300px', border: '1px solid' }}
        className="overflow-y-auto"
      >
        {meccas.length !== 0 &&
          meccas.map((mecca, index) => {
            return (
              <Link key={index} href={`/mecca/${mecca.mecca_id}`}>
                <div className="border-b border-gray-600 p-5">
                  <h2>{mecca.title}</h2>
                  <p>{mecca.mecca_name}</p>
                  {placeInfos.length !== 0 && (
                    <div className="flex">
                      <p>{placeInfos[index].displayName.text}</p>
                      <p>{placeInfos[index].formattedAddress.split(' ')[1]}</p>
                    </div>
                  )}
                  <p>{mecca.about}</p>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
