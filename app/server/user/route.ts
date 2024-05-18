import { NextResponse } from 'next/server';

import * as service from './service';

export async function GET(_: Request) {
  const data = await service.getUser();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await request.json();
  const { name, roomId } = session;
  const data = await service.createUser({ name, roomId });
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const session = await request.json();
  const { userId, stockId, buyCount } = session;
  const data = await service.buyStock(userId, stockId, buyCount);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const { userId } = session;
  await service.deleteUser(userId);
  return NextResponse.json(``);
}
