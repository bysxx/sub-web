import { Stock } from "./stock";
import Image from 'next/image';

import { stockdummys } from '../../../../src/dummydata/stock-data';

export default function StockListPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="w-full mt-8 ">
        {/* Search Box */}
        <div className="relative min-w-47 rounded-[20px] shadow-xl bg-white p-2">
          <div className="flex justify-between gap-2">
            <div className="flex p-3 gap-2 rounded-xl bg-[#ECF0F3] w-full">
              <Image src="/images/icon/icon-search.svg" alt="search" width={12} height={12} className="opacity-50" />
              <input type="text" placeholder="종목 검색" className="w-full focus:outline-0 bg-transparent text-[18px] text-secondary-d300" />
            </div>
            <div>
              <button className="size-12">
                <Image src="/images/icon/SB_Button_Filter.svg" alt="search-button" width={100} height={100} />
              </button>
            </div>
          </div>      
        </div>
        {/* Stock List*/}
        <div className="grid grid-rows-1 mt-12 gap-4">
          {stockdummys.map((stock) => (
            <Stock 
              key={stock.id}
              id={stock.id}
              name={stock.name}
              price={stock.price}
              changeRate={stock.changeRate}
              // imageUrl={stock.imageUrl}
            />
          ))}
        </div>
      </div>
    </main>
  );
}