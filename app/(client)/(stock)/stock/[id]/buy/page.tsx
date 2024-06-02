'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function StockBuyPage() {
  const [inputValue, setInputValue] = useState('0');

  const handleButtonClick = (value) => {
    if (value === 'back') {
      setInputValue(inputValue.slice(0, -1) || '0');
    } else {
      setInputValue(inputValue === '0' ? value : inputValue + value);
    }
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
        <div className="mt-3 flex justify-center gap-1 text-red-500">
          <Image src="/images/stock/Stock_Icon_Change.svg" alt="chart" width={16} height={16} />
          <div>2.5%</div>
        </div>
      </div>
      {/* 입력 패드 */}
      <div className="mt-4 w-full rounded-b rounded-t-[28px] border border-secondary-d200 bg-white p-12">
        <div className="mb-2 text-left text-[12px] text-secondary-d300">몇 주 매수할까요?</div>
        <div className="mb-2 text-left align-bottom text-[24px] font-bold text-secondary-d300">
          {inputValue}
          <span className="text-[16px] font-semibold"> 주</span>
        </div>
        <div className="mb-12 text-left align-bottom font-semibold text-primary-b200">
          {inputValue * 500}
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
      {/* 매수하기 버튼 */}
      <div className="mt-3 flex w-full justify-center">
        <button className="w-full rounded-b-[20px] rounded-t bg-secondary-d100 px-40 py-4 text-[20px] font-semibold text-primary-d400">
          매수하기
        </button>
      </div>
    </main>
  );
}
