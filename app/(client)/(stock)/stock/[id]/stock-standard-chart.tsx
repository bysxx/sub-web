'use client';

import React, { useEffect, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { AxisDomainItem } from 'recharts/types/util/types';

interface Log {
  value: number;
}

interface Product {
  value: number;
  logs: Log[];
}

interface CustomTooltipProps {
  active: boolean;
  payload: any[];
  label: string;
}

const fetchStockData = async (stockId: any): Promise<Product> => {
  const response = await fetch(`/server/stocks/${stockId}`);
  const data = await response.json();
  return data.product;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length && label !== '0') {
    return (
      <div className="rounded-md bg-white p-2 text-[12px] font-semibold text-secondary-y100 opacity-80">
        <p>{`${Math.round(payload[0].value)}서브`}</p>
      </div>
    );
  }

  return null;
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

  // data.unshift({
  //   // 오늘 데이터 추가
  //   date: today.getDate().toString(),
  //   value: product.value,
  // });

  while (data.length < 4) {
    // 최대 4일치 데이터로 제한
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
        <Tooltip content={<CustomTooltip active={true} payload={[]} label="" />} />
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
