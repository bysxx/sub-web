import StockContainer from './stock-container';
import Header from '../../../src/components/ui/header';
import NewsList from './news-list';
import Link from 'next/link';
import Image from 'next/image';

import { newsdummys } from '../../../src/dummydata/news-data';


export default function MainPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center px-8 pt-8">
      <Header />
      <div className='w-full drop-shadow-xl'>      
        <div className="relative min-w-47 mt-[1.75rem] mb-[1.75rem] rounded-[20px] bg-primary-b200 p-4 text-white">
          <div className="mt-2 text-[16px]">나의 자산</div>
          <div className="mt-1 align-bottom text-[32px] font-bold">
            281,500
            <span className="text-[22px]"> 서브</span> {/* {price.toLocaleString('ko-KR')} */}
          </div>
        </div>
      </div>

      <StockContainer />

      <div className="flex flex-col w-full flex-grow px-6 pb-6 rounded-t-[20px] bg-[#ECF0F3]">
        <Link href="/news">
          <button className="flex justify-center w-full py-6">
            <Image src="/images/icon/News_C1_Button_Expand.svg" alt="news-expand" width={50} height={100} />
          </button>
          <h1 className="text-[22px] font-bold mb-2">오늘의 소식</h1>
        </Link>
        <ul role="list" className="flex flex-col w-full max-h-[200px] overflow-y-auto scrollbar-hide divide-y divide-[#D0DCE5]">
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