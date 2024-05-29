import { NextResponse } from 'next/server';

import * as service from '../../service';

export async function GET(_: Request) {
  const data = await service.getUser();

  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { pathname } = url;
  const segments = pathname.split('/');
  const stockId = segments[3];

  const session = await request.json();
  const { userId, buyCount } = session;
  const data = await service.buyStock(userId, stockId, buyCount);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const { userId } = session;
  await service.deleteUser(userId);
  return NextResponse.json(``);
}
