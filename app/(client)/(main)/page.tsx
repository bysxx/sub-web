import StockContainer from './stock-container';
import Header from '../../../src/components/ui/header';
import NewsList from './news-list';


export default function MainPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <Header />
      <div className='w-full drop-shadow-xl'>      
        <div className="relative min-w-47 mt-[1.75rem] mb-[1.75rem] rounded-[20px] bg-primary-b200 p-4 text-white">
          <div className="mt-2 text-[16px]">나의 자산</div>
          <div className="mt-1 align-bottom text-[32px] font-bold">
            56,000
            <span className="text-[22px]"> 서브</span>
          </div>
        </div>
      </div>

      <StockContainer />

      <div className="w-full p-6 rounded-[20px] bg-[#ECF0F3]">
        <img className="mb-6"></img>
        <h1 className="text-[22px] font-bold mb-4">오늘의 소식</h1>
        <ul className="mt-4 flex flex-col w-full overflow-x-hidden scrollbar-hide divide-y divide-[#D0DCE5]">
          <NewsList />
          <NewsList />
          <NewsList />
        </ul>
      </div>
    </main>
  );
}