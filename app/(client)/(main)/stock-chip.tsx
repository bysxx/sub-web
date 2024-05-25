import Link from "next/link";
import Image from "next/image";

interface IStockProps {
  id: number;
  name: string;
  price: number;
  changeRate: number;
}

export default function StockCard({ id, name, price, changeRate }: IStockProps) {
  const changeStyle = changeRate > 0
    ? { bg: "bg-secondary-r100", src: "/images/icon/icon_arrow_up.svg", alt: "stock-up" }
    : changeRate < 0
    ? { bg: "bg-primary-b200", src: "/images/icon/icon_arrow_down.svg", alt: "stock-down" }
    : { bg: "bg-secondary-d300", src: "/images/icon/icon-arrow-nochange.svg", alt: "stock-nochange" };

  return (
    <Link href={`/stock/${id}`}>
      <li className="relative min-w-47 rounded-[20px] shadow-lg bg-[#FF9508]/20 p-4 mb-10">
        <div className={`absolute flex right-4 top-4 rounded-xl ${changeStyle.bg} px-2 py-1 text-[10px] text-white`}>
          <Image src={changeStyle.src} alt={changeStyle.alt} width={10} height={10} className="mr-1" />
          {changeRate}%
        </div>
        <div className="flex justify-start">
          <div className="rounded-xl bg-[#FF9508] p-3">
            <div className="size-6"></div>
          </div>
        </div>
        <div className="mt-2 text-[12px] text-secondary-d300 font-semibold">{name}</div>
        <div className="mt-1 align-bottom text-[20px] text-secondary-d400 font-semibold">
          {price.toLocaleString('ko-KR')}<span className="text-[12px]"> 서브</span>
        </div>
      </li>
    </Link>
  );
}

// export default function StockCard() {
//   return <Stock id={stock.id} name={stock.name} price={stock.price} changeRate={stock.changeRate} />;
// }