'use client'

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
    photos: ['画像のパス1', '画像のパス2', '画像のパス3'],
    username: '',
    is_author: null,
    is_favorite: null,
  })
  const [place, setPlace] = useState()
  const [address, setAddress] = useState()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  useEffect(() => {
    // fetch(`${apiUrl}/meccas/${params.id}`)
    //   .then((res) => {
    //     return res.json()
    //   })
    //   .then((data) => {
    setMecca({
      mecca_id: '聖地ID',
      anime_id: 'アニメID',
      title: 'あの日見た花の名前を僕達はまだ知らない。',
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
    })
    // })
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
    <div>
      <p>{mecca.title}</p>
      <p>{`第${mecca.episode}話 ${mecca.scene}`}</p>
      <h1 className="text-2xl">{mecca.mecca_name}</h1>
      <div className="flex">
        <p>{place}</p>
        <p>{address && address.split(' ')[1]}</p>
      </div>
      <p>{mecca.about}</p>
      <p>{mecca.username}さん</p>
    </div>
  )
}
