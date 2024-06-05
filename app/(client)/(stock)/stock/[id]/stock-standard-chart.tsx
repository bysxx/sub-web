// 'use client';

// // import '../../../../../src/styles/stock-chart.css';

// import React from 'react';
// import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
// import type { AxisDomainItem } from 'recharts/types/util/types';

// const data = [
//   { date: '24', value: 80.5 },
//   { date: '25', value: 82 },
//   { date: '26', value: 81 },
//   { date: '27', value: 82 },
// ];

// const getYDomain = (valuelist: any[]): [AxisDomainItem, AxisDomainItem] => {
//   const values = valuelist.map((d) => d.value);
//   const min = Math.min(...values);
//   const max = Math.max(...values);
//   const diff = Math.round(((max - min) / 4) * 10) / 10;
//   return [min - diff, max + diff];
// };

// const lastDataIndex = data.length - 1;
// const lastData = data[lastDataIndex];

// export default function StandardPriceChart() {
//   if (!lastData) return null;

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <LineChart
//         data={data}
//         margin={{
//           top: 20,
//           right: 20,
//           left: 0,
//           bottom: 0,
//         }}
//         className="line-chart"
//       >
//         <CartesianGrid stroke="#ECF0F3" vertical={false} horizontal={true} className="cartesian-grid" />
//         <XAxis
//           dataKey="date"
//           fontSize="10px"
//           fontWeight="400"
//           tickFormatter={(x) => (x === lastData.date ? '오늘' : `${x}일`)}
//           stroke="#596874"
//           tickLine={false}
//           tick={{ fill: '#596874' }}
//           padding={{ left: 30, right: 30 }}
//         />
//         <YAxis
//           domain={getYDomain(data)}
//           fontSize="10px"
//           fontWeight="400"
//           stroke="#596874"
//           tickLine={false}
//           axisLine={false}
//           tick={{ fill: '#596874' }}
//         />
//         <Line
//           type="linear"
//           dataKey="value"
//           stroke="#FFB74B"
//           strokeWidth={4}
//           dot={{ r: 0 }}
//           activeDot={{ r: 6 }}
//           className="line"
//         />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { AxisDomainItem } from 'recharts/types/util/types';

interface Log {
  value: number;
}

interface Product {
  value: number;
  logs: Log[];
}

const fetchStockData = async (stockId: any): Promise<Product> => {
  const response = await fetch(`/server/stocks/${stockId}`);
  const data = await response.json();
  return data.product;
};

const getYDomain = (valuelist: { value: number }[]): [AxisDomainItem, AxisDomainItem] => {
  const values = valuelist.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const diff = Math.round(((max - min) / 4) * 10) / 10;
  if (min - diff < 0) return [0, max + diff];
  return [min - diff, max + diff];
};

const processChartData = (product: Product) => {
  const today = new Date();
  const logs = product.logs.slice().reverse();

  const data = logs.map((log, index) => {
    const date = new Date();
    date.setDate(today.getDate() - index);
    return {
      date: date.getDate().toString(),
      value: log.value,
    };
  });

  // 오늘의 데이터 추가
  data.unshift({
    date: today.getDate().toString(),
    value: product.value,
  });

  // 최대 4일치 데이터로 제한
  while (data.length < 4) {
    const date = new Date();
    date.setDate(today.getDate() - data.length);
    data.push({
      date: date.getDate().toString(),
      value: 0,
    });
  }

  return data.reverse();
};

const StandardPriceChart = ({ stockId }: { stockId: any }) => {
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    fetchStockData(stockId).then((product) => {
      setData(processChartData(product));
    });
  }, [stockId]);

  const lastData = data[data.length - 1];

  if (!lastData) return null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 10,
          left: 0,
          bottom: 0,
        }}
        className="line-chart"
      >
        <CartesianGrid stroke="#ECF0F3" vertical={false} horizontal={true} className="cartesian-grid" />
        <XAxis
          dataKey="date"
          fontSize="10px"
          fontWeight="400"
          tickFormatter={(x) => (x === lastData.date ? '오늘' : `${x}일`)}
          stroke="#596874"
          tick={{ fill: '#596874' }}
          tickLine={false}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis
          domain={getYDomain(data)}
          fontSize="10px"
          fontWeight="400"
          stroke="#596874"
          tickLine={false}
          axisLine={false}
          tick={{ fill: '#596874' }}
        />
        <Line
          type="linear"
          dataKey="value"
          stroke="#FFB74B"
          strokeWidth={4}
          dot={{ r: 0 }}
          activeDot={{ r: 6 }}
          className="line"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StandardPriceChart;
