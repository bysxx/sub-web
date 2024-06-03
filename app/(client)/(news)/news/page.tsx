import NewsList from 'app/(client)/(main)/news-list';
import Navigation from 'app/(client)/navigation';
import Link from 'next/link';

import { newsdummys } from '../../../../src/dummydata/news-data';

export default function NewsListPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mb-4 w-full pt-8 ">
        <div className="flex justify-between">
          <h1 className="mb-4 text-[22px] font-bold">오늘의 소식</h1>
          <Link href="/news/write">
            <button className="text-[14px] text-primary-b200">소식 쓰기</button>
          </Link>
        </div>
        <ul role="list" className="flex w-full flex-col divide-y divide-[#D0DCE5] overflow-x-hidden scrollbar-hide">
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
