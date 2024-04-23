'use client';

import Link from 'next/link';
import { useLoginUser } from '@/app/LoginUserProvider';

export const Header = () => {
  const loginUser = useLoginUser();
  return (
    <header className="sticky flex justify-between px-8 w-screen h-16 bg-teal-400 items-center drop-shadow-2xl border-b border-gray-300 shadow-md">
      <h1 className="font-bold text-2xl">
        <Link href={'/'}>bsample</Link>
      </h1>
      <div className="flex gap-3">
        {loginUser ? (
          <Link href={'/setting'}>
            <div className="w-100 h-20 flex items-center">
              <span>設定へ</span>
            </div>
          </Link>
        ) : (
          <Link href={'/login'}>
            <div className="w-100 h-20 flex items-center">
              <span>ログイン</span>
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};
