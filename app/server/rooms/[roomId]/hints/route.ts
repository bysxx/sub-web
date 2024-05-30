import { NextResponse } from 'next/server';

import * as service from '../../service';

export async function GET(request: Request) {
  const url = new URL(request.url);

  const { pathname } = url;
  const segments = pathname.split('/');
  const roomId = segments[3] as string;
  const data = await service.getHint(roomId);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const url = new URL(request.url);

  const { pathname } = url;
  const segments = pathname.split('/');
  const roomId = segments[3] as string;

  const session = await request.json();
  const userId = session.userId as string;
  const title = session.title as string;
  const description = session.description as string;
  const data = await service.addHint(roomId, userId, title, description);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url);

  const { pathname } = url;
  const segments = pathname.split('/');
  const roomId = segments[3] as string;

  const session = await request.json();
  const hintId = session.hintId as string;
  const data = await service.dropHint(roomId, hintId);
  return NextResponse.json(data);
}
