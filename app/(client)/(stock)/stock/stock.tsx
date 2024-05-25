"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image';

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

//   const imageSrc = changeRate < 0
//   ? "/images/stock/List_C2_Graph.svg"
//   : changeRate === 0
//   ? "/images/stock/List_C3_Graph.svg"
//   : "/images/stock/List_C1_Graph.svg";

//   return (
//       <div onClick={onClick} className="relative w-full min-w-47 rounded-[20px] shadow-lg bg-white p-3 pointer-events-auto">
//         <div className="flex justify-start items-center pointer-events-auto">
//           <div className="rounded-xl bg-secondary-y100 p-3">
//         <div className="size-4"></div>
//           </div>
//           <div className="truncate text-primary-d400 pl-2">{name}</div>
//           <div className="ml-auto flex gap-5">
//         <Image src={imageSrc} alt="chart" width={50} height={40} />
//         <div>
//           <div className="text-right">{price} 서브</div>
//           <div className={`text-right text-[12px] ${changeRate > 0 ? 'text-secondary-r100' : changeRate < 0 ? 'text-primary-b200' : 'text-primary-d400'}`}>{changeRate.toFixed(2)}%</div>
//         </div>
//           </div>
//         </div>
//       </div> 
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
        <div className="rounded-xl bg-secondary-y100 p-3">
          <div className="size-4"></div>
        </div>
        <div className="truncate text-[16px] text-primary-d400 pl-2">선생님의 몸무게</div>
        <div className="ml-auto flex gap-5">
          <Image src="/images/stock/List_C1_Graph.svg" alt="chart" width={50} height={40} />
          <div>
            <div className="text-right">12,020 서브</div>
            <div className="text-right text-secondary-r100">+30.58%</div>
          </div>
        </div>
      </div>
    </div> 
  )
}