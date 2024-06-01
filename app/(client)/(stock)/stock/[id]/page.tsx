'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { rankdummys } from '../../../../../src/dummydata/rank-data';
import RankList from './rank-list';
import MarketPriceChart from './stock-market-chart';
import StandardPriceChart from './stock-standard-chart';

export default function MarketPlacePage() {
  const changeRate = 2.5;
  let imageSrc = '/images/stock/List_C1_Graph.svg';
  if (changeRate < 0) {
    imageSrc = '/images/stock/List_C2_Graph.svg';
  } else if (changeRate === 0) {
    imageSrc = '/images/stock/List_C3_Graph.svg';
  }

  const [isMarketPriceChartVisible, setIsMarketPriceChartVisible] = useState(true);

  const handleMarketPriceButtonClick = () => {
    setIsMarketPriceChartVisible(true);
  };

  const handleStandardPriceButtonClick = () => {
    setIsMarketPriceChartVisible(false);
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mt-8 w-full">
        <div className="mb-12 flex gap-2">
          <Image src="/images/stock/Stock_Icon_Weight.svg" alt="stock" width={16} height={16} />
          <div>선생님 몸무게</div>
        </div>
        <div className="flex items-end justify-center font-bold text-secondary-d400">
          <div className="text-[32px] leading-none">500</div>
          <div className="ml-2 text-[24px] leading-none"> 서브</div>
        </div>
        <div className="mt-3 flex justify-center gap-1">
          <Image src={imageSrc} alt="chart" width={16} height={100} />
          <div
            // eslint-disable-next-line no-nested-ternary
            className={`${changeRate > 0 ? 'text-secondary-r100' : changeRate < 0 ? 'text-primary-b200' : 'text-secondary-d300'}`}
          >
            {changeRate.toFixed(2)}%
          </div>
        </div>
        <div className="my-6 grid grid-cols-2 gap-4 self-stretch text-center font-semibold">
          <button className="rounded-full bg-primary-b200 px-12 py-2 text-white">매수하기</button>
          <button className="rounded-full bg-[#ECF0F3] px-12 py-2 text-primary-d400">매도하기</button>
        </div>
        <div className="rounded-[28px] border border-[#ECF0F3] p-4 pb-6">
          <div className="mb-4 flex justify-end gap-2">
            <button
              className={`rounded-l-full px-2.5 py-1 text-[12px] ${isMarketPriceChartVisible ? 'bg-primary-b200 text-white' : 'bg-secondary-d100 text-secondary-d300'}`}
              onClick={handleMarketPriceButtonClick}
            >
              시장가
            </button>
            <button
              className={`rounded-r-full px-2.5 py-1 text-[12px] ${!isMarketPriceChartVisible ? 'bg-secondary-y100 text-white' : 'bg-secondary-d100 text-secondary-d300'}`}
              onClick={handleStandardPriceButtonClick}
            >
              기준값
            </button>
          </div>
          <div className="w-full" style={{ width: '100%', height: 200 }}>
            {isMarketPriceChartVisible ? <MarketPriceChart /> : <StandardPriceChart />}
          </div>
        </div>
        <div className="mt-6 rounded-[28px] border border-[#ECF0F3] px-4 pb-6 pt-1 shadow-md">
          <Link href={`/stock/1/rank`}>
            <button className="flex w-full justify-center py-3">
              <Image src="/images/icon/Stock_C1_Button_Expand.svg" alt="news-expand" width={50} height={100} />
            </button>
          </Link>
          <h1 className="mb-2 text-[20px] font-bold text-primary-d400">실시간 현황</h1>
          <ul
            role="list"
            className="flex max-h-[200px] w-full flex-col divide-y divide-[#D0DCE5] overflow-y-auto scrollbar-hide"
          >
            {rankdummys.map((rank) => (
              <RankList
                key={rank.userid}
                id={rank.userid}
                username={rank.username}
                rank={rank.rank}
                howmuch={rank.howmuch}
              />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
