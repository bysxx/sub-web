import { NextResponse } from 'next/server';

import * as service from './service';

export async function POST(request: Request) {
  const session = await request.json();
  const { roomId, price, value, name, description, valuePerRate } = session;
  const data = await service.createStock(roomId, price, value, name, description, valuePerRate);
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await request.json();
  const { stockId, newValue } = session;
  const data = await service.updateStockValue(stockId, newValue);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const { roomId, stockId } = session;
  await service.deleteStock(roomId, stockId);
  return NextResponse.json(``);
}
