import StockCard from './stock-chip';

export default function StockContainer() {
  return (
    <div className="w-full">
      <h1 className="text-[22px] font-bold">나의 포트폴리오</h1>
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
