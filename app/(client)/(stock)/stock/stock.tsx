"use client";
import { useRouter } from "next/navigation";
import Image from 'next/image';

interface IStockProps {
  id: number;
  name: string;
  price: number;
  changeRate: number;
  // imageUrl: string;
}

export function Stock({ id, name, price, changeRate }: IStockProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/stock/${id}`);
  };

  const imageSrc = changeRate < 0
  ? "/images/stock/List_C2_Graph.svg"
  : changeRate === 0
  ? "/images/stock/List_C3_Graph.svg"
  : "/images/stock/List_C1_Graph.svg";

  return (
    <div onClick={onClick} className="relative w-full min-w-47 rounded-[20px] shadow-lg bg-white p-3 pointer-events-auto">
      <div className="flex justify-start items-center pointer-events-auto">
        <div className="rounded-xl bg-secondary-y100 p-3">
      <div className="size-4"></div>
        </div>
      <div className="truncate text-primary-d400 pl-3">{name}</div>
      <div className="ml-auto flex items-center">
        <Image src={imageSrc} alt="chart" width={25} height={100} className="absolute left-3/4" />
        <div>
          <div className="text-right text-[15px]">{price.toLocaleString('ko-KR')} 서브</div>
          <div className={`text-right text-[12px] ${changeRate > 0 ? 'text-secondary-r100' : changeRate < 0 ? 'text-primary-b200' : 'text-secondary-d300'}`}>{changeRate.toFixed(2)}%</div>
        </div>
      </div>
      </div>
    </div> 
  )
}