import Image from 'next/image';
import Link from 'next/link';

interface IStockProps {
  id: string;
  name: string;
  price: number;
  changeRate: number;
  imageURL: string;
}

export default function StockCard({ id, name, price, changeRate, imageURL }: IStockProps) {
  let changeStyle;
  if (changeRate > 0) {
    changeStyle = { bg: 'bg-secondary-r100', src: '/images/icon/icon_arrow_up.svg', alt: 'stock-up' };
  } else if (changeRate < 0) {
    changeStyle = { bg: 'bg-primary-b200', src: '/images/icon/icon_arrow_down.svg', alt: 'stock-down' };
  } else {
    changeStyle = { bg: 'bg-secondary-d300', src: '/images/icon/icon-arrow-nochange.svg', alt: 'stock-nochange' };
  }

  return (
    <Link href={`/stock/${id}`}>
      <li className="relative mb-10 min-w-47 rounded-[20px] bg-[#FF9508]/20 p-4 shadow-lg">
        <div className={`absolute right-4 top-4 flex rounded-xl ${changeStyle.bg} px-2 py-1 text-[10px] text-white`}>
          <Image src={changeStyle.src} alt={changeStyle.alt} width={10} height={10} className="mr-1" />
          {changeRate.toFixed(2)}%
        </div>
        <div className="flex justify-start">
          <Image src={imageURL} alt="stock" width={48} height={48} />
        </div>
        <div className="mt-2 text-[12px] font-semibold text-secondary-d300">{name}</div>
        <div className="mt-1 align-bottom text-[20px] font-semibold text-secondary-d400">
          {price.toLocaleString('ko-KR')}
          <span className="text-[12px]"> 서브</span>
        </div>
      </li>
    </Link>
  );
}

// export default function StockCard() {
//   return <Stock id={stock.id} name={stock.name} price={stock.price} changeRate={stock.changeRate} />;
// }
