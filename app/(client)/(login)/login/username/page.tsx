'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UsernamePage() {
  const [username, setUsername] = useState('');
  const isButtonDisabled = username.trim().length < 2;
  const router = useRouter();

  const handleLogin = async () => {
    const userData = await fetch('/server/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname: username, countryCode: '123' }),
    }).then((res) => res.json());

    window.localStorage.setItem('userId', userData.product._id);

    router.push('/');
  };

  return (
    <div className="min-h-screen w-full p-8">
      <div className="flex flex-col items-center">
        <div className="mb-[136px] mt-32 flex flex-col items-center">
          <Image src="/logo.svg" alt="logo" width={80} height={80} />
          <div className="mt-5 text-[20px] font-bold">반가워요, 투자자님!</div>
        </div>
        <div className="relative mb-6 mt-14 flex w-4/5 gap-2 rounded-[20px] bg-[#ECF0F3] p-3 shadow-xl">
          <input
            type="text"
            required
            placeholder="이름 입력"
            className="w-full bg-transparent text-secondary-d300 required:border-red-500 focus:outline-0"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="text-[18px]">투자자님의 이름을 알려주세요</div>
        <button className="absolute top-3/4 disabled:opacity-50" disabled={isButtonDisabled}>
          {isButtonDisabled ? (
            <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} />
          ) : (
            <button onClick={handleLogin}>
              <Image src="/images/icon/Boot_Button01.svg" alt="next" width={80} height={80} />
            </button>
          )}
        </button>
      </div>
    </div>
  );
}
