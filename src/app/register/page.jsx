'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Registerpage = () => {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const [message, setMessage] = useState()

  const router = useRouter()
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const onSubmitRegister = async (e) => {
    e.preventDefault()

    const user = {
      user: {
        username,
        password,
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
      setMessage('登録に失敗しました。')
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 md:px-12">
      <h2 className="mb-4 text-2xl font-bold">新規登録</h2>

      <form
        className="rounded bg-slate-200 p-6 shadow-lg"
        onSubmit={onSubmitRegister}
      >
        <div className="mb-4">
          <label className="mb-2 text-sm font-bold text-gray-700">
            ユーザー名
          </label>
          <input
            type="text"
            className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="名前を入力"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 text-sm font-bold text-gray-700">
            パスワード
          </label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="パスワードを入力"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 text-sm font-bold text-gray-700">
            パスワード（確認）
          </label>
          <input
            type="password"
            className="w-full rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="確認用のパスワードを入力"
            onChange={(e) => {
              setPasswordConfirmation(e.target.value)
            }}
          />
        </div>

        <button
          type="submit"
          className=" px4 rounded-md border py-2 text-green-500"
        >
          登録
        </button>
      </form>
      {message && (
        <div className="mt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="#FF2D50"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
          <p className="ml-1 text-[15px]">{message}</p>
        </div>
      )}
    </div>
  )
}

export default Registerpage
