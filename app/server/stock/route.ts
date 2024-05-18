import { NextResponse } from 'next/server';

import * as service from './service';

export async function GET(_: Request) {
  const data = await service.getStock();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await request.json();
  const { price, name, description } = session;
  const data = await service.createStock('a', { price, name, description });
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await request.json();
  const { id, price } = session;
  const data = await service.updateStock(id, price);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const { id } = session;
  await service.deleteStock(id);
  return NextResponse.json(``);
}
