'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Header from '../../../src/components/ui/header';
import { useUserData } from '../../../src/hooks/useUserData';
import Navigation from '../navigation';
import type { INewsProps } from './news-list';
import NewsList from './news-list';
import StockContainer from './stock-container';

export default function MainPage() {
  const userId = '66597985bdc5679131ec8d40';
  const userData = useUserData(userId);
  const [newsData, setNewsData] = useState<INewsProps[]>([]);

  useEffect(() => {
    fetch(`/server/rooms/665978306a8ce7a5b641241e/hints`)
      // fetch(`/server/rooms/${roomId}/hints`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setNewsData(data.product);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching user rank data:', error);
      });
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col items-center px-8 pt-8">
      <Header />
      <div className="w-full drop-shadow-xl">
        <div className="relative my-7 min-w-47 rounded-[20px] bg-primary-b200 p-4 text-white">
          <div className="mt-2 text-[16px]">나의 자산</div>
          <div className="mt-1 align-bottom text-[32px] font-bold">
            {userData && userData.balance ? userData.balance.toLocaleString('ko-KR') : '0'}
            <span className="text-[22px]"> 서브</span>
          </div>
        </div>
      </div>
      <StockContainer />
      <div className="flex w-full grow flex-col rounded-t-[20px] bg-[#ECF0F3] px-6 pb-6">
        <Link href="/news">
          <button className="flex w-full justify-center py-6">
            <Image src="/images/icon/News_C1_Button_Expand.svg" alt="news-expand" width={50} height={100} />
          </button>
          <h1 className="mb-2 text-[22px] font-bold">오늘의 소식</h1>
        </Link>
        <ul
          role="list"
          className="flex max-h-64 w-full flex-col divide-y divide-[#D0DCE5] overflow-y-auto scrollbar-hide"
        >
          {newsData.map((news) => (
            <NewsList
              key={news._id}
              _id={news._id}
              title={news.title}
              description={news.description}
              userId={news.userId || '선생님'}
              date={new Date(news.date).toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            />
          ))}
        </ul>
        <Navigation />
      </div>
    </main>
  );
}
