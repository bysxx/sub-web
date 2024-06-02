import Image from 'next/image';
import { useState } from 'react';

import { rankdummys } from '../../../../../src/dummydata/rank-data';
import RankList from './rank-list';

export default function RankListBox() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
      className={`mt-6 rounded-[28px] border border-[#ECF0F3] px-4 pb-6 pt-1 shadow-md transition-all duration-300 ${
        isExpanded ? 'relative -mt-[17.5rem] max-h-[450px] bg-white opacity-95' : 'max-h-[150px]'
      }`}
      style={{ overflow: isExpanded ? 'visible' : 'hidden' }}
    >
      <button className="flex w-full justify-center py-3" onClick={handleExpandClick}>
        <Image src="/images/icon/Stock_C1_Button_Expand.svg" alt="news-expand" width={50} height={100} />
      </button>
      <h1 className="mb-2 text-[20px] font-bold text-primary-d400">실시간 현황</h1>
      <div className={`${isExpanded ? 'max-h-[350px]' : 'max-h-[60px] scrollbar-hide'} overflow-y-auto duration-300`}>
        <ul role="list" className="flex w-full flex-col">
          {rankdummys.map((rank) => (
            <RankList
              key={rank.userid}
              userId={rank.userid}
              username={rank.username}
              rank={rank.rank}
              howmuch={rank.howmuch}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
