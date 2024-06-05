'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';

export default function NewsWritePage() {
  const router = useRouter();
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const onClickBack = () => {
    router.push('/news');
  };
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto'; // 높이 초기화
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  };
  useEffect(() => {
    if (textarea.current) {
      handleResizeHeight();
    }
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="w-full pt-4">
        <div className="flex items-center justify-between p-4 align-middle ">
          {/* shadow-[0_0_30px_0_rgba(0,0,0,0.3)] border-b-2  */}
          <button className="flex size-5 items-center justify-center" onClick={onClickBack}>
            <Image src="/images/icon/Back_button.svg" alt="back" width={9} height={16} />
          </button>
          <div className="justify-center align-middle text-[22px] font-bold">소식 쓰기</div>
          <Link href="/news">
            <button className="text-[14px] text-primary-b200">게시</button>
          </Link>
        </div>
        <div className="mt-9">
          <input
            type="text"
            placeholder="제목"
            className="my-3 w-full bg-transparent text-[20px] font-semibold focus:outline-0"
          />
          <div className="h-px w-full border border-secondary-d200 opacity-50"></div>
          <textarea
            placeholder="내용을 입력해주세요."
            className="my-3 h-3/5 w-full resize-none bg-transparent text-[16px] focus:outline-0"
            ref={textarea}
            onInput={handleResizeHeight}
            rows={1}
          />
        </div>
        <div className="fixed bottom-12">
          <button className="flex size-12 items-center justify-center rounded-[20px] p-3 shadow-md">
            <Image src="/images/icon/Image_upload.svg" alt="image" width={20} height={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
