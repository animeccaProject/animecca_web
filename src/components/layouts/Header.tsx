'use client'

import Link from 'next/link'
import { useState } from 'react'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu)
  }
  return (
    <div className="App">
      <div className="container mx-auto px-3">
        <header className="flex justify-between py-3 ">
          <Link href="/">
            <h1>ロゴ</h1>
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
            <ul className="mt-6 text-center ">
              <li className="mt-2">
                <a href="/">TOP</a>
              </li>
              <li className="mt-2">
                <a href="/mylist">マイリスト</a>
              </li>
              <li className="mt-2">
                <a href="/mecca/new">聖地の登録</a>
              </li>
              <li className="mt-2">
                <a href="/login">ログイン</a>
              </li>
              <li className="mt-2">
                <a href="/register">会員登録</a>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    </div>
  )
}

export default Header
