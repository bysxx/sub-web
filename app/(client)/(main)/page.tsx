'use client';

import Image from 'next/image';
import Link from 'next/link';

import Header from '../../../src/components/ui/header';
import { newsdummys } from '../../../src/dummydata/news-data';
import { useUserData } from '../../../src/hooks/useUserData';
import Navigation from '../navigation';
import NewsList from './news-list';
import StockContainer from './stock-container';

export default function MainPage() {
  const userId = '66597985bdc5679131ec8d40';
  const userData = useUserData(userId);

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
          {newsdummys.map((news) => (
            <NewsList
              key={news.id}
              id={news.id}
              title={news.title}
              description={news.description}
              writer={news.writer}
              time={news.time}
            />
          ))}
        </ul>
        <Navigation />
      </div>
    </main>
  );
}
