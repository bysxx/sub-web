import NewsList from "app/(client)/(main)/news-list";
import Link from "next/link";

import { newsdummys } from '../../../../src/dummydata/news-data';

export default function NewsListPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
    <div className="w-full pt-8 mb-4 ">
      <div className="flex justify-between">
        <h1 className="text-[22px] font-bold mb-4">오늘의 소식</h1>
        <Link href="/news/write">
          <button className="text-[14px] text-primary-b200">소식 쓰기</button>
        </Link>
      </div>
      <ul role="list" className="flex flex-col w-full overflow-x-hidden scrollbar-hide divide-y divide-[#D0DCE5]">
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
    </div>
    </main>
  );
}