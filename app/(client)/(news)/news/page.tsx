'use client';

import NewsList from 'app/(client)/(main)/news-list';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import type { INewsProps } from '../../(main)/news-list';

export default function NewsListPage() {
  const [newsData, setNewsData] = useState<INewsProps[]>([]);

  useEffect(() => {
    fetch(`/server/rooms/665fe129d061b2718711f05a/hints`)
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
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mb-4 w-full pt-8 ">
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
            newsData.map((news) => (
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
      </div>
    </main>
  );
}
