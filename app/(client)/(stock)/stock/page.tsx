import Image from 'next/image';

import { stockdummys } from '../../../../src/dummydata/stock-data';
import { Stock } from './stock';

export default function StockListPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mt-8 w-full">
        {/* Search Box */}
        <div className="relative min-w-47 rounded-[20px] bg-white p-2 shadow-xl">
          <div className="flex justify-between gap-2">
            <div className="flex w-full gap-2 rounded-xl bg-[#ECF0F3] p-3">
              <Image src="/images/icon/icon-search.svg" alt="search" width={12} height={12} className="opacity-50" />
              <input
                type="text"
                placeholder="종목 검색"
                className="w-full bg-transparent text-[18px] text-secondary-d300 focus:outline-0"
              />
            </div>
            <div>
              <button className="size-12">
                <Image src="/images/icon/SB_Button_Filter.svg" alt="search-button" width={100} height={100} />
              </button>
            </div>
          </div>
        </div>
        {/* Stock List */}
        <div className="mt-12 grid grid-rows-1 gap-4">
          {stockdummys.map((stock) => (
            <Stock
              key={stock.id}
              id={stock.id}
              name={stock.name}
              price={stock.price}
              changeRate={stock.changeRate}
              imageURL={stock.imageURL}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
