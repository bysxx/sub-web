'use client';

import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import type { AxisDomainItem } from 'recharts/types/util/types';

const data = [
  { date: '24', price: 300 },
  { date: '25', price: 400 },
  { date: '26', price: 200 },
  { date: '27', price: 500 },
];

const getYDomain = (pricelist: any[]): [AxisDomainItem, AxisDomainItem] => {
  const prices = pricelist.map((d) => d.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const diff = Math.round(((max - min) / 4) * 10) / 10;
  return [min - diff, max + diff];
};

const lastDataIndex = data.length - 1;
const lastData = data[lastDataIndex];

export default function MarketPriceChart() {
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
          tickFormatter={(value) => (value === lastData.date ? '오늘' : value)}
          stroke="#596874"
          tick={{ fill: '#596874' }}
          tickLine={false}
          padding={{ left: 30, right: 30 }}
        />
        <YAxis domain={getYDomain(data)} fontSize="10px" fontWeight="400" tickLine={false} axisLine={false} />
        <Line
          type="linear"
          dataKey="price"
          stroke="#5396F1"
          strokeWidth={4}
          dot={{ r: 0 }}
          activeDot={{ r: 6 }}
          className="line"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
