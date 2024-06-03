'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import StockCard, { LoadingStockCard } from './stock-chip';

export default function StockContainer() {
  const [stocks, setStocks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/server/rooms/665978306a8ce7a5b641241e/stocks')
      .then((res) => res.json())
      .then((data) => {
        setStocks(data.stocks);
      });
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-[22px] font-bold">나의 포트폴리오</h1>
        <Link href="/stock">
          <button className="truncate text-[14px] text-primary-b200">전체보기 ⮕</button>
        </Link>
      </div>
      <ul className="mt-4 flex w-full gap-3 overflow-scroll scrollbar-hide">
        {stocks.length > 0 ? (
          stocks.map((stock) => (
            <StockCard key={stock._id} id={stock._id} name={stock.name} price={stock.price} changeRate={stock.rate} />
          ))
        ) : (
          <LoadingStockCard />
        )}
      </ul>
    </div>
  );
}
