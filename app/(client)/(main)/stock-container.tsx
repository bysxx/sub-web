import Link from 'next/link';

import { stockdummys } from '../../../src/dummydata/stock-data';
import StockCard from './stock-chip';

export default function StockContainer() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-[22px] font-bold">나의 포트폴리오</h1>
        <Link href="/stock">
          <button className="truncate text-[14px] text-primary-b200">전체보기 ⮕</button>
        </Link>
      </div>
      <ul className="mt-4 flex w-full gap-3 overflow-scroll scrollbar-hide">
        {stockdummys.map((stock) => (
          <StockCard
            key={stock.id}
            id={stock.id}
            name={stock.name}
            price={stock.price}
            changeRate={stock.changeRate}
            imageURL={stock.imageURL}
          />
        ))}
      </ul>
    </div>
  );
}
