// 일단 전 페이지 똑같이 사용..

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { INewsProps } from '../../../(main)/news-list';
import NewsList from '../../../(main)/news-list';

export default function NewsListPage() {
  const [newsData, setNewsData] = useState<INewsProps[]>([]);

  useEffect(() => {
    fetch(`/server/rooms/666143e233f984e872398b8a/hints`)
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
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mb-4 w-full pt-8">
        <div className="flex justify-between">
          <h1 className="mb-4 text-[22px] font-bold">오늘의 소식</h1>
          <Link href="/news/write">
            <button className="text-[14px] text-primary-b200">소식 쓰기</button>
          </Link>
        </div>
        <ul
          role="list"
          className="flex w-full flex-col divide-y divide-secondary-d200 overflow-x-hidden scrollbar-hide"
        >
          {newsData &&
            newsData.map((news) => <NewsList key={news.hint._id} nickname={news.nickname} hint={news.hint} />)}
        </ul>
      </div>
    </main>
  );
}
