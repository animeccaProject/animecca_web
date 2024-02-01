
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Registerpage = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()

  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const onSubmitRegister = async (e) => {
    e.preventDefault()

    const user = {
      user: {
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
      },
    }

    const res = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await res.json()
    if (res.ok) {
      router.push('/login')
    } else {
      // エラー処理
    }
  }

  return (
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">新規登録</h2>


      

      <form
        className="bg-slate-200 p-6 rounded shadow-lg"
        onSubmit={onSubmitRegister}
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

        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            パスワード（確認）
          </label>
          <input
            type="password"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="確認用のパスワードを入力"


            onChange={(e) => {
              setPasswordConfirmation(e.target.value)
            }}

          />
        </div>

        <button
          type="submit"
          className=" text-green-500 py-2 px4 border rounded-md"
        >
          登録
        </button>
      </form>
    </div>
  )
}

export default Registerpage
