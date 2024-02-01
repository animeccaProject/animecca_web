'use client'
import { useState } from 'react'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const handleMenuOpen = () => {
    setOpenMenu(!openMenu)
  }

  return (
    <div className="App">
      <div className="container mx-auto px-3  bg-red-300">
        <header className="flex justify-between py-3 ">
          <h1>ロゴ</h1>

          {/* humbergerbutton */}
          <button
            onClick={handleMenuOpen}
            type="button"
            className="z-30 space-y-2"
          >
            <div
              className={
                openMenu
                  ? 'w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-in-out'
                  : 'w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out'
              }
            />
            <div
              className={
                openMenu
                  ? 'opacity-0 transition duration-500 ease-in-out'
                  : 'w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out'
              }
            />
            <div
              className={
                openMenu
                  ? 'w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-in-out'
                  : 'w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out'
              }
            />
          </button>

          {/* nav */}
          <nav
            className={
              openMenu
                ? 'text-left fixed bg-slate-200 z-20 right-0 top-0 w-2/12  h-screen flex flex-col justify-start pt-8 px-3 ease-linear duration-300'
                : 'fixed right-[-100%] ease-linear duration-300'
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
                <a href="/mecca">聖地の登録</a>
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
