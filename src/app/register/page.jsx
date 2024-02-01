const Registerpage = () => {
  return (
    <div className="min-h-screen py-8 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-4">新規登録</h2>

      <form className="bg-slate-200 p-6 rounded shadow-lg">
        <div className="mb-4">
          <label className="text-gray-700 text-sm font-bold mb-2">
            ユーザー名
          </label>
          <input
            type="text"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
            placeholder="名前を入力"
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
