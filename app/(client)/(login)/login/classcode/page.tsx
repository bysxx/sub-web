'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function UsernamePage() {
  const [username, setUsername] = useState('');

  const isButtonDisabled = username.trim().length < 1;

  return (
    <div className="min-h-screen w-full p-8">
      <div className="flex flex-col items-center">
        <div className="mb-34 mt-32 flex flex-col items-center">
          <Image src="/logo.svg" alt="logo" width={80} height={80} />
          <div className="mt-5 text-[20px] font-bold">반가워요, 투자자님!</div>
        </div>
        <div className="h-13 b-3 relative mb-6 mt-14 flex w-4/5 gap-2 rounded-[20px] bg-[#ECF0F3] p-3 shadow-xl">
          <input
            type="text"
            required
            placeholder="국가코드 입력"
            className="required:color-red-500 w-full bg-transparent text-secondary-d300 focus:outline-0"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="text-[18px]">투자자님의 국가를 알려주세요</div>
        <button className="absolute top-3/4 disabled:opacity-50" disabled={isButtonDisabled}>
          {isButtonDisabled ? (
            <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} />
          ) : (
            <Link href="/login/username">
              <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} />
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}
