import { NextResponse } from 'next/server';

import * as service from '../../service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;
  const segments = pathname.split('/');
  const userId = segments[3] as string;
  const stockId = segments[4] as string;

  const data = await service.getStockChipByUserAndStock(userId, stockId);
  return NextResponse.json(data);
}
