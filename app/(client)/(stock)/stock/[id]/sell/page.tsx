'use client';

import type { IStock } from 'app/server/stocks/interfaces';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { useUserData } from '../../../../../../src/hooks/useUserData';
import Navigation from '../../../../navigation';
import Modal from '../../modal';

export default function StockSellPage({ params }: { params: { id: string } }) {
  const [inputValue, setInputValue] = useState('0');
  const [stock, setStock] = useState<IStock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = '66597985bdc5679131ec8d40';
  const userData = useUserData(userId);

  useEffect(() => {
    fetch(`/server/stocks/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setStock(data.product);
      });
  }, [params.id]);

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

  const handleButtonClick = (value: any) => {
    if (value === 'back') {
      setInputValue(inputValue.slice(0, -1) || '0');
    } else {
      setInputValue(inputValue === '0' ? value : inputValue + value);
    }
  };

  const handleSellClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    // 매도 확정
    setIsModalOpen(false);
    setInputValue('0');
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center p-8">
      <div className="mt-8 w-full">
        <div className="mb-12 flex gap-2">
          <Image src={imageURL} alt="stock" width={16} height={16} />
          <div>{stock ? stock.name : 'Loading...'}</div>
        </div>
        <div className="flex items-end justify-center font-bold text-secondary-d400">
          <div className="text-[32px] leading-none">{stock ? stock.price : '0'}</div>
          <div className="ml-2 text-[24px] leading-none"> 서브</div>
        </div>
        <div className="mt-3 flex justify-center gap-1 text-red-500">
          <Image src={changeArrow} alt="chart" width={16} height={100} />
          <div
            className={`${
              // eslint-disable-next-line no-nested-ternary
              stock && stock.rate > 0
                ? 'text-secondary-r100'
                : stock && stock.rate < 0
                  ? 'text-primary-b200'
                  : 'text-secondary-d300'
            }`}
          >
            {stock ? stock.rate.toFixed(2) : '0.00'}%
          </div>
        </div>
      </div>
      <div className="mt-4 w-full rounded-b rounded-t-[28px] border border-secondary-d200 bg-white p-12">
        <div className="mb-2 text-left text-[12px] text-secondary-d300">몇 주 매수할까요?</div>
        <div className="mb-2 text-left align-bottom text-[24px] font-bold text-secondary-d300">
          {inputValue}
          <span className="text-[16px] font-semibold"> 주</span>
        </div>
        <div className="mb-8 text-left align-bottom font-semibold text-primary-b200">
          {Number(inputValue) * 500}
          <span className="text-[12px] font-medium"> 서브</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              className="flex items-center justify-center p-3 text-[24px] font-semibold text-primary-d400"
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
            </button>
          ))}
          <div></div>
          <button
            className="flex items-center justify-center p-4 pb-0 text-[24px] font-semibold text-primary-d400"
            onClick={() => handleButtonClick('0')}
          >
            0
          </button>
          <button
            className="flex items-center justify-center p-4 pb-0 text-[24px] font-bold text-primary-d400"
            onClick={() => handleButtonClick('back')}
          >
            &larr;
          </button>
        </div>
      </div>
      <div className="mt-3 flex w-full justify-center">
        <button
          className={`w-full rounded-b-[20px] rounded-t bg-primary-b200 px-40 py-4 text-[20px] font-semibold text-white ${
            inputValue === '0' || (userData && Number(inputValue) > userData.balance)
              ? 'cursor-not-allowed bg-secondary-d100 text-primary-d400'
              : ''
          }`}
          onClick={handleSellClick}
        >
          매도하기
        </button>
      </div>
      <Navigation />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        message="매도하시겠습니까?"
      />
    </main>
  );
}
