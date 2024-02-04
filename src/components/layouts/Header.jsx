'use client'

import { deleteCookie, getCookie } from '@/utils/cookies'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import pic from '../../../public/Group47.png'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu)
  }

  const [username, setUsername] = useState('ゲスト')
  const [userId, setUserId] = useState('')

  useEffect(() => {
    getUsername()
  }, [])

  // useEffect(() => {
  //   window.location.reload()
  // })

  async function getUsername() {
    const name = await getCookie('username')
    const id = await getCookie('id')
    if (name) {
      setUsername(name)
    }
    if (id) {
      setUserId(id)
    }
  }

  async function logout() {
    await deleteCookie('username')
    await deleteCookie('token')
    setUsername('ゲスト')
    router.push('/')
  }

  const router = useRouter()

  return (
    <div className="App">
      <div className="container mx-auto px-3">
        <header className="flex justify-between py-3 ">
          <Link href="/">
            <h1>
              <img src={pic.src} alt="pic" className="w-30 h-11" />
            </h1>
          </Link>

          {/* humbergerbutton */}
          <button
            onClick={handleMenuOpen}
            type="button"
            className="z-30 space-y-2"
          >
            <div
              className={
                openMenu
                  ? 'h-0.5 w-8 translate-y-2.5 rotate-45 bg-gray-600 transition duration-500 ease-in-out'
                  : 'h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out'
              }
            />
            <div
              className={
                openMenu
                  ? 'opacity-0 transition duration-500 ease-in-out'
                  : 'h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out'
              }
            />
            <div
              className={
                openMenu
                  ? 'h-0.5 w-8 -rotate-45 bg-gray-600 transition duration-500 ease-in-out'
                  : 'h-0.5 w-8 bg-gray-600 transition duration-500 ease-in-out'
              }
            />
          </button>

          {/* nav */}
          <nav
            className={
              openMenu
                ? 'fixed right-0 top-0 z-20 flex h-screen w-2/12  flex-col justify-start bg-slate-200 px-3 pt-8 text-left duration-300 ease-linear'
                : 'fixed right-[-100%] duration-300 ease-linear'
            }
          >
            <ul className="ml-6 mt-12">
              <li className="mt-2">
                <a href="/">TOP</a>
              </li>
              {username !== 'ゲスト' ? (
                <>
                  <li className="mt-2">
                    <a href={`/mylist/${userId}`}>マイリスト</a>
                  </li>
                  <li className="mt-2">
                    <a href="/mecca/new">聖地の登録</a>
                  </li>
                  <li className="mt-2 cursor-pointer" onClick={logout}>
                    ログアウト
                  </li>
                </>
              ) : (
                <>
                  <li className="mt-2">
                    <a href="/login">ログイン</a>
                  </li>
                  <li className="mt-2">
                    <a href="/register">ユーザー登録</a>
                  </li>
                </>
              )}
            </ul>
            <div className="ml-6 mt-10 flex items-center">
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
              <p className="ml-2 text-[14px]">{username} さん</p>
            </div>
          </nav>
        </header>
      </div>
    </div>
  )
}

export default Header
