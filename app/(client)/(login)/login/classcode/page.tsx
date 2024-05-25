"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function UsernamePage() {
  const [username, setUsername] = useState('');

  const isButtonDisabled = username.trim().length < 1; 

  return (
    <div className="w-full min-h-screen p-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mt-32 mb-34">
          <Image src="/logo.svg" alt="logo" width={80} height={80} />
          <div className="text-[20px] font-bold mt-5">반가워요, 투자자님!</div>
        </div>
        <div className="relative flex w-4/5 h-13 p-3 b-3 gap-2 rounded-xl bg-[#ECF0F3] rounded-[20px] shadow-xl mt-14 mb-6">
          <input 
            type="text" 
            required 
            placeholder="국가코드 입력" 
            className="w-full focus:outline-0 bg-transparent text-secondary-d300 required:color-red-500" 
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="text-[18px]">투자자님의 국가를 알려주세요</div>
        <button className="absolute top-3/4 disabled:opacity-50" disabled={isButtonDisabled}>
          {isButtonDisabled ? (
            <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} />
          ) : (
            <Link href="/login/ready">
              <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} />
            </Link>
          )}
        </button>
      </div>
    </div>
  );
}
