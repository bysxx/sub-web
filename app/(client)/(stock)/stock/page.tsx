import { Stock } from "./stock";

export default function StockListPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="w-full mt-8 ">
        {/* Search Box */}
        <div className="relative min-w-47 rounded-[20px] shadow-xl bg-white p-2 b-5">
          <div className="flex justify-between gap-2">
            <div className="flex p-3 b-3 gap-2 rounded-xl bg-[#ECF0F3] w-full">
              <div className="text-[18px]">🔍</div> {/* 나중에 svg로 대체 */}
              {/* <div className="text-[18px] text-secondary-d300">종목 검색</div> */}
              <input type="text" placeholder="종목 검색" className="w-full focus:outline-0 bg-transparent text-[18px] text-secondary-d300" />
            </div>
            <div className="">
              <button className="rounded-xl bg-primary-b200 size-12"></button>
            </div>          
          </div>      
        </div>
        {/* Stock List*/}
        <div className="grid grid-rows-1 mt-12 gap-4"> {/* flex flex-col */}
          {/* {stocks.map((stock) => (
            <Stock 
              key={stock.id}
              id={stock.id}
              name={stock.name}
              price={stock.price}
              changeRate={stock.changeRate}
              imageUrl={stock.imageUrl}
            />
          ))} */}
          <Stock />
          <Stock />
          <Stock />
          <Stock />
          <Stock />
        </div>
      </div>
    </main>
  );
}