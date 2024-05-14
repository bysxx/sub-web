import StockCard from './stock-chip';

export default function StockContainer() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-[22px] font-bold">나의 포트폴리오</h1>
        <button className="text-[14px] truncate text-primary-b200">전체보기 ⮕</button>
      </div>
      <ul className="mt-4 flex w-full gap-3 overflow-scroll scrollbar-hide">
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />
      </ul>
    </div>
  );
}
