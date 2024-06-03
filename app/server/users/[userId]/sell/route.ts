import { NextResponse } from 'next/server';

import * as service from '../../service';

export async function PATCH(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;
  const segments = pathname.split('/');
  const userId = segments[3] as string;

  const session = await request.json();
  const stockId = session.stockId as string;
  const sellCount = session.sellCount as number;
  const data = await service.sellStock(userId, stockId, sellCount);
  return NextResponse.json(data);
}
