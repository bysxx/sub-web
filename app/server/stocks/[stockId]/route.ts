import { NextResponse } from 'next/server';

import * as service from '../service';

export async function GET(request: Request) {
  const url = new URL(request.url);

  const { pathname } = url;
  const segments = pathname.split('/');
  const stockId = segments[3] as string;
  const data = await service.getOneStock(stockId);
  return NextResponse.json(data);
}
