'use client';

import type { IStock } from 'app/server/stocks/interfaces';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import Navigation from '../../../navigation';
import RankListBox from './rank-list-box';
import MarketPriceChart from './stock-market-chart';
import StandardPriceChart from './stock-standard-chart';

export default function MarketPlacePage({ params }: { params: { id: string } }) {
  const [stock, setStock] = useState<IStock | null>(null);
  const roomId = '6656d87bfdadd7535652e8a7';
  const [isRankListBoxExpanded, setIsRankListBoxExpanded] = useState(false);

  useEffect(() => {
    fetch(`/server/stocks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setStock(data.product);
        // eslint-disable-next-line no-console
        console.log('[data.product]', data.product);
      });
  }, []);

  const changeArrow = useMemo(() => {
    const changeRate = stock?.rate ?? 0;
    if (changeRate < 0) {
      return '/images/stock/List_C2_Graph.svg';
    }
    if (changeRate === 0) {
      return '/images/stock/List_C3_Graph.svg';
    }
    return '/images/stock/List_C1_Graph.svg';
  }, [stock]);

  let imageURL = '/images/stock/Stock_Icon_Weight.svg';
  if (params.id === '66597aa3bdc5679131ec8d55') {
    imageURL = '/images/stock/Stock_Icon_Socks.svg';
  } else if (params.id === '66597ab9bdc5679131ec8d59') {
    imageURL = '/images/stock/Stock_Icon_Homework.svg';
  } else if (params.id === '66597af1bdc5679131ec8d5d') {
    imageURL = '/images/stock/Stock_Icon_Late.svg';
  }

  const [isMarketPriceChartVisible, setIsMarketPriceChartVisible] = useState(true);

  const handleMarketPriceButtonClick = () => {
    setIsMarketPriceChartVisible(true);
  };

  const handleStandardPriceButtonClick = () => {
    setIsMarketPriceChartVisible(false);
  };

  const handleRankListBoxToggle = () => {
    setIsRankListBoxExpanded((prev) => !prev);
  };

  if (!stock) return null;

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mt-8 w-full">
        <div className="mb-12 flex gap-2">
          <Image src={imageURL} alt="stock" width={16} height={16} />
          <div>{stock.name}</div>
        </div>
        <div className="flex items-end justify-center font-bold text-secondary-d400">
          <div className="text-[32px] leading-none">{stock.price}</div>
          <div className="ml-2 text-[24px] leading-none"> 서브</div>
        </div>
        <div className="mt-3 flex justify-center gap-1">
          <Image src={changeArrow} alt="chart" width={16} height={100} />
          <div
            // eslint-disable-next-line no-nested-ternary
            className={`${stock.rate > 0 ? 'text-secondary-r100' : stock.rate < 0 ? 'text-primary-b200' : 'text-secondary-d300'}`}
          >
            {stock.rate.toFixed(2)}%
          </div>
        </div>
        <div className="my-6 grid grid-cols-2 gap-4 self-stretch text-center font-semibold">
          <button
            className="rounded-full bg-primary-b200 px-12 py-2 text-white"
            // eslint-disable-next-line no-return-assign
            onClick={() => (window.location.href = `/stock/${params.id}/buy`)}
          >
            매수하기
          </button>
          <button
            className="rounded-full bg-[#ECF0F3] px-12 py-2 text-primary-d400"
            // eslint-disable-next-line no-return-assign
            onClick={() => (window.location.href = `/stock/${params.id}/sell`)}
          >
            매도하기
          </button>
        </div>
        {/* 그래프 박스 컴포넌트 */}
        <div className="relative rounded-[28px] border border-[#ECF0F3] p-4 pb-6">
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

        <RankListBox
          stockId={params.id}
          roomId={roomId}
          isExpanded={isRankListBoxExpanded}
          onToggleExpand={handleRankListBoxToggle}
        />
        <Navigation />
      </div>
    </main>
  );
}
