import { NextResponse } from 'next/server';

import * as service from './service';

export async function POST(request: Request) {
  const session = await request.json();
  const roomId = session.roomId as string;
  const price = session.price as number;
  const value = session.value as number;
  const name = session.name as string;
  const description = session.description as string;
  const valuePerRate = session.valuePerRate as number;
  const data = await service.createStock(roomId, price, value, name, description, valuePerRate);
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await request.json();
  const stockId = session.stockId as string;
  const newValue = session.newValue as number;
  const data = await service.updateStockValue(stockId, newValue);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const roomId = session.roomId as string;
  const stockId = session.stockId as string;
  const data = await service.deleteStock(roomId, stockId);
  return NextResponse.json(data);
}
