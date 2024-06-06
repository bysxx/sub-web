import Image from 'next/image';
import Link from 'next/link';

export interface IStockProps {
  id: string;
  name: string;
  price: number;
  changeRate: number;
}

export default function StockCard({ id, name, price, changeRate }: IStockProps) {
  let changeArrow;
  if (changeRate > 0) {
    changeArrow = { bg: 'bg-secondary-r100', src: '/images/icon/icon_arrow_up.svg', alt: 'stock-up' };
  } else if (changeRate < 0) {
    changeArrow = { bg: 'bg-primary-b200', src: '/images/icon/icon_arrow_down.svg', alt: 'stock-down' };
  } else {
    changeArrow = { bg: 'bg-secondary-d300', src: '/images/icon/icon-arrow-nochange.svg', alt: 'stock-nochange' };
  }

  let changeStyle;
  if (id === '665fe28bd061b2718711f07f') {
    changeStyle = { imageURL: '/images/stock/Stock_Icon_Socks.svg', bg: 'bg-[#53CC5F]/20' };
  } else if (id === '665fe2acd061b2718711f083') {
    changeStyle = { imageURL: '/images/stock/Stock_Icon_Homework.svg', bg: 'bg-[#BCD8FF]/20' };
  } else if (id === '665fe2cad061b2718711f087') {
    changeStyle = { imageURL: '/images/stock/Stock_Icon_Late.svg', bg: 'bg-[#002448]/20' };
  } else {
    changeStyle = { imageURL: '/images/stock/Stock_Icon_Weight.svg', bg: 'bg-[#FF9508]/20' };
  }

  return (
    <Link href={`/stock/${id}`}>
      {/* `/stock/${News_C1_Button_Expandid}` */}
      <li className={`relative mb-10 min-w-47 rounded-[20px] ${changeStyle.bg} p-4 shadow-lg`}>
        <div className={`absolute right-4 top-4 flex rounded-xl ${changeArrow.bg} px-2 py-1 text-[10px] text-white`}>
          <Image src={changeArrow.src} alt={changeArrow.alt} width={10} height={10} className="mr-1" />
          {changeRate.toFixed(2)}%
        </div>
        <div className="flex justify-start">
          <Image src={changeStyle.imageURL} alt="stock" width={48} height={48} />
        </div>
        <div className="mt-2 text-[12px] font-semibold text-secondary-d300">{name}</div>
        <div className="mt-1 align-bottom text-[20px] font-semibold text-secondary-d400">
          {Math.round(price).toLocaleString('ko-KR')}
          <span className="text-[12px]"> 서브</span>
        </div>
      </li>
    </Link>
  );
}

export function LoadingStockCard() {
  return (
    <>
      <li className="relative mb-10 h-[132px] min-w-47 animate-pulse rounded-[20px] bg-[#FF9508] p-4 shadow-lg"></li>
      <li className="relative mb-10 h-[132px] min-w-47 animate-pulse rounded-[20px] bg-[#FF9508] p-4 shadow-lg"></li>
      <li className="relative mb-10 h-[132px] min-w-47 animate-pulse rounded-[20px] bg-[#FF9508] p-4 shadow-lg"></li>
      <li className="relative mb-10 h-[132px] min-w-47 animate-pulse rounded-[20px] bg-[#FF9508] p-4 shadow-lg"></li>
      <li className="relative mb-10 h-[132px] min-w-47 animate-pulse rounded-[20px] bg-[#FF9508] p-4 shadow-lg"></li>
    </>
  );
}
