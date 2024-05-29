import { NextResponse } from 'next/server';

import * as service from '../../service';

export async function PATCH(request: Request) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const { pathname } = url;
  const segments = pathname.split('/');
  const userId = segments[3];

  const session = await request.json();
  const { stockId, buyCount } = session;
  const data = await service.buyStock(userId, stockId, buyCount);
  return NextResponse.json(data);
}
