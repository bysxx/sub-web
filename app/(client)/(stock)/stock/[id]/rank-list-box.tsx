import Image from 'next/image';
import { useEffect, useState } from 'react';

import RankList from './rank-list';

interface UserStockRank {
  _id: string;
  nickname: string;
  roomId: string;
  balance: number;
  stockAssets: {
    stockId: string;
    count: number;
    average: number;
    _id: string;
  }[];
}

interface RankListBoxProps {
  stockId: string;
  roomId: string;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function RankListBox({ stockId, roomId, isExpanded, onToggleExpand }: RankListBoxProps) {
  const [rankData, setRankData] = useState<UserStockRank[]>([]);

  useEffect(() => {
    fetch(`/server/stocks/${stockId}/666143e233f984e872398b8a/userrank`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRankData(data.product);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching user rank data:', error);
      });
  }, [stockId, roomId]);

  return (
    <div
      // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
      className={`mt-6 rounded-[28px] border border-[#ECF0F3] px-4 pb-6 pt-1 shadow-md transition-all duration-300 ${
        isExpanded ? 'relative -mt-[17.5rem] mb-16 max-h-[450px] bg-white opacity-95' : 'max-h-[150px]'
      }`}
      style={{ overflow: isExpanded ? 'visible' : 'hidden' }}
    >
      <button className="flex w-full justify-center py-3" onClick={onToggleExpand}>
        <Image src="/images/icon/Stock_C1_Button_Expand.svg" alt="news-expand" width={50} height={100} />
      </button>
      <h1 className="mb-2 text-[20px] font-bold text-primary-d400">실시간 현황</h1>
      <div className={`${isExpanded ? 'max-h-[350px]' : 'max-h-[60px] scrollbar-hide'} overflow-y-auto duration-300`}>
        <ul role="list" className="flex w-full flex-col">
          {rankData.map((rank, index) => (
            <RankList
              key={rank._id}
              username={rank.nickname}
              rank={index + 1}
              howmuch={rank.stockAssets.find((asset) => asset.stockId === stockId)?.count || 0}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

// 더미데이터로 하는 코드 (혹시나몰라서..)

// import Image from 'next/image';
// import { useState } from 'react';

// import { rankdummys } from '../../../../../src/dummydata/rank-data';
// import RankList from './rank-list';

// export default function RankListBox() {
//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleExpandClick = () => {
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <div
//       // eslint-disable-next-line tailwindcss/enforces-negative-arbitrary-values
//       className={`mt-6 rounded-[28px] border border-[#ECF0F3] px-4 pb-6 pt-1 shadow-md transition-all duration-300 ${
//         isExpanded ? 'relative -mt-[17.5rem] max-h-[450px] bg-white opacity-95' : 'max-h-[150px]'
//       }`}
//       style={{ overflow: isExpanded ? 'visible' : 'hidden' }}
//     >
//       <button className="flex w-full justify-center py-3" onClick={handleExpandClick}>
//         <Image src="/images/icon/Stock_C1_Button_Expand.svg" alt="news-expand" width={50} height={100} />
//       </button>
//       <h1 className="mb-2 text-[20px] font-bold text-primary-d400">실시간 현황</h1>
//       <div className={`${isExpanded ? 'max-h-[350px]' : 'max-h-[60px] scrollbar-hide'} overflow-y-auto duration-300`}>
//         <ul role="list" className="flex w-full flex-col">
//           {rankdummys.map((rank) => (
//             <RankList
//               key={rank.userid}
//               userId={rank.userid}
//               username={rank.username}
//               rank={rank.rank}
//               howmuch={rank.howmuch}
//             />
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }
// /app/(client)/(stock)/stock/[id]/rank-list-box.tsx
