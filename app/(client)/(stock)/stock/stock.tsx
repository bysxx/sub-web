'use client';

import Image from 'next/image';
import Link from 'next/link';

export interface IStockProps {
  id: string;
  name: string;
  price: number;
  changeRate: number;
}

export function Stock({ id, name, price, changeRate }: IStockProps) {
  let changeArrow = '/images/stock/List_C1_Graph.svg';
  if (changeRate < 0) {
    changeArrow = '/images/stock/List_C2_Graph.svg';
  } else if (changeRate === 0) {
    changeArrow = '/images/stock/List_C3_Graph.svg';
  }

  let imageURL = '/images/stock/Stock_Icon_Weight.svg';
  if (id === '665fe28bd061b2718711f07f') {
    imageURL = '/images/stock/Stock_Icon_Socks.svg';
  } else if (id === '665fe2acd061b2718711f083') {
    imageURL = '/images/stock/Stock_Icon_Homework.svg';
  } else if (id === '665fe2cad061b2718711f087') {
    imageURL = '/images/stock/Stock_Icon_Late.svg';
  }

  return (
    <Link href={`/stock/${id}`}>
      <div className="pointer-events-auto relative w-full min-w-47 rounded-[20px] bg-white p-3 shadow-lg">
        <div className="pointer-events-auto flex items-center justify-start">
          <Image src={imageURL} alt="stock" width={40} height={40} />
          <div className="truncate pl-3 text-primary-d400">{name}</div>
          <div className="ml-auto flex items-center">
            <Image src={changeArrow} alt="chart" width={25} height={100} className="absolute left-3/4" />
            <div>
              <div className="text-right text-[15px]">{Math.round(price).toLocaleString('ko-KR')} 서브</div>
              <div
                // eslint-disable-next-line no-nested-ternary
                className={`text-right text-[12px] ${changeRate > 0 ? 'text-secondary-r100' : changeRate < 0 ? 'text-primary-b200' : 'text-secondary-d300'}`}
              >
                {changeRate.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
