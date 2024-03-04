import Link from "next/link"

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Link href={'/setting/user'}>
          <div className="w-100 h-20 flex items-center">
            <span>ユーザ情報の編集</span>
          </div>
        </Link>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Link href={'/setting/email'}>
          <div className="w-100 h-20 flex items-center">
            <span>Emailの編集</span>
          </div>
        </Link>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Link href={'/setting/password'}>
          <div className="w-100 h-20 flex items-center">
            <span>パスワードの編集</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
