"use client";
import { useRouter } from "next/navigation";

interface IStockProps {
  id: string;
  name: string;
  price: string;
  changeRate: number;
  imageUrl: string;
}

// export function Stock({ id, name, price, changeRate, imageUrl }: IStockProps) {
//   const router = useRouter();
//   const onClick = () => {
//     router.push(`/stock/${id}`);
//   };
//   return (
      // <div onClick={onClick} className="relative w-full min-w-47 rounded-[20px] shadow-lg bg-white p-3 pointer-events-auto">
      //   <div className="flex justify-start items-center pointer-events-auto">
      //     <div className="rounded-xl bg-[#FF9508] p-3">
      //   <div className="size-4"></div>
      //     </div>
      //     <div className="truncate text-[16px] text-black pl-2">{name}</div>
      //     <div className="ml-auto flex gap-5">
      //   <img src={changeRate < 0 ? "/images/stock/List_C2_Graph.png" : "/images/stock/List_C1_Graph.png"} alt="chart" className="w-[50px] h-[40px] " /> {/* svg로 바꾸기 */}
      //   <div>
      //     <div className="text-right text-[16px]">{price} 서브</div>
      //     <div className={`text-right text-[12px] ${changeRate > 0 ? 'text-secondary-r100' : changeRate < 0 ? 'text-primary-b200' : 'text-black'}`}>{changeRate.toFixed(2)}%</div>
      //   </div>
      //     </div>
      //   </div>
      // </div> 
//   )
// }

export function Stock() {
  const router = useRouter();
  const onClick = () => {
    router.push('/stock/1');
  };
  return (
    <div onClick={onClick} className="relative w-full min-w-47 rounded-[20px] shadow-lg bg-white p-3 hover:cursor-pointer">
      <div className="flex justify-start items-center">
        <div className="rounded-xl bg-[#FF9508] p-3">
          <div className="size-4"></div>
        </div>
        <div className="truncate text-[16px] text-black pl-2">선생님의 몸무게</div>
        <div className="ml-auto flex gap-5">
          <img src="/images/stock/List_C1_Graph.png" alt="chart" className="w-[50px] h-[40px] " /> {/* svg로 바꾸기 */}
          <div>
            <div className="text-right text-[16px]">12,020 서브</div>
            <div className="text-right text-[12px] text-secondary-r100">+30.58%</div>
          </div>
        </div>
      </div>
    </div> 
  )
}