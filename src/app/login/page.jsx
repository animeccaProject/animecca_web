'use client'

import { setCookie } from '@/utils/cookies'
import { useState } from 'react'

const Loginpage = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const onSubmitLogin = async (e) => {
    e.preventDefault()

    const user = {
      user: {
        username: username,
        password: password,
      },
    }

    const res = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await res.json()
    if (res.ok) {
      await setCookie('username', data.user.username)
      await setCookie('token', data.user.token)
      router.push('/')
    } else {
      // エラー処理
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">ログイン</h2>

      <form
        className="bg-slate-200 p-6 rounded shadow-lg"
        onSubmit={onSubmitLogin}
      >
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            ユーザー名
          </label>
          <input
            type="text"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="名前を入力"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>

        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            パスワード
          </label>
          <input
            type="password"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="パスワードを入力"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <button
          type="submit"
          className=" text-green-500 py-2 px4 border rounded-md"
        >
          ログイン
        </button>
      </form>
    </div>
  )
}

export default Loginpage
