import { NextResponse } from 'next/server';

import * as service from '../../service';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;
  const segments = pathname.split('/');
  const userId = segments[3] as string;
  const data = await service.getTotalBalanceByUser(userId);

  return NextResponse.json(data);
}
