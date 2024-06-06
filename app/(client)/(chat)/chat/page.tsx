'use client';

import useArray from '@hooks/Utils/useArray';
import Image from 'next/image';
import Link from 'next/link';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';

interface Message {
  sender: 'player' | 'suvy';
  text: string;
}

function SuvyChat({ message }: { message: string }) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[270px] break-keep rounded-[28px] rounded-bl-none bg-[#EEE] px-7 py-3 text-[#505050]">
        {message}
      </div>
    </div>
  );
}

function PlayerChat({ message }: { message: string }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[270px] break-keep rounded-[28px] rounded-tr-none bg-primary-b200 px-7 py-3 text-white">
        {message}
      </div>
    </div>
  );
}

const DEFAULT_CHAT: Message[] = [{ sender: 'suvy', text: '안녕! 나는 SUVY야. 주식에 대해 궁금한 거 있으면 물어봐!' }];

export default function MainPage() {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const { array: messages, push } = useArray<Message>(DEFAULT_CHAT);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() !== '') {
      push({ sender: 'player', text: input });
      setInput('');
    }
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1]?.sender === 'player') {
      const suvyResponses = [
        '매수는 주식을 사는 걸 말해! 주식은 회사의 작은 조각들이야. 그래서 매수는 그 회사의 작은 조각들을 사는 거야. 예를 들어, 너가 좋아하는 장난감 가게가 있다고 생각해봐. 그 가게의 작은 조각들을 조금씩 사서 네가 그 가게의 작은 주인이 되는 거야. 이렇게 주식을 사는 걸 매수라고 해! 재미있지?',
      ];
      const randomResponse = suvyResponses[Math.floor(Math.random() * suvyResponses.length)];

      setTimeout(() => {
        push({ sender: 'suvy', text: randomResponse || '' });
      }, 1000);
    }
  }, [messages]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <>
      <header className="sticky top-0 z-10 flex w-full items-center gap-4 bg-white px-6 py-3 shadow-md">
        <Link href="/">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="20" viewBox="0 0 12 20" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.99259 10.0039L11.4569 2.22855C11.6444 2.03651 11.6399 1.71942 11.4479 1.52292L10.1131 0.156316C9.92116 -0.040188 9.60866 -0.044654 9.42116 0.147384L0.305089 9.64212C0.206874 9.74038 0.162231 9.87436 0.17116 10.0039C0.166696 10.1379 0.211339 10.2674 0.305089 10.3656L9.42116 19.8648C9.60866 20.0569 9.92116 20.0524 10.1131 19.8559L11.4479 18.4893C11.6399 18.2928 11.6444 17.9757 11.4569 17.7837L3.99259 10.0039Z"
              fill="#596874"
            />
          </svg>
        </Link>
        <div className="flex items-center gap-2">
          <Image src="/images/suvy.png" alt="suvy" width={32} height={36} />
          <div className="flex flex-col gap-1">
            <div className="text-[20px] font-bold text-primary-b200">SUVY</div>
            <div className="text-[16px] font-semibold text-[#53CC5F] before:mr-0.5 before:content-['•']">온라인</div>
          </div>
        </div>
      </header>
      <main className="relative w-full px-8 pt-8">
        <div className="flex min-h-screen w-full flex-col gap-9">
          {messages.map((msg, index) =>
            msg.sender === 'player' ? (
              <PlayerChat key={index} message={msg.text} />
            ) : (
              <SuvyChat key={index} message={msg.text} />
            ),
          )}
        </div>

        <form className="fixed bottom-9 w-[calc(100%-64px)] rounded-[26px] px-6 py-5 shadow-lg" onSubmit={handleSend}>
          <input
            placeholder="메세지를 입력하세요."
            className="h-4 w-full text-[16px] leading-none"
            value={input}
            onChange={handleInputChange}
          />
          <button className="absolute right-6 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 8.57143L4.57143 10.2857L5.14286 16L8 12L12 16L16 0L0 8.57143ZM11.3821 13.7643L7.99999 10.2857L12.5714 4.00003L5.71427 9.49289L2.76427 8.38575L14.2643 2.22503L11.3821 13.7643Z"
                fill="#5396F1"
              />
            </svg>
          </button>
        </form>
      </main>
    </>
  );
}
