import { NextResponse } from 'next/server';

import * as service from '../../service';

export async function GET(request: Request) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  const { pathname } = url;
  const segments = pathname.split('/');
  const roomId = segments[3];
  const data = await service.getHint(roomId);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  const { pathname } = url;
  const segments = pathname.split('/');
  const roomId = segments[3];

  const session = await request.json();
  const { userId, title, description } = session;
  const data = await service.addHint(roomId, userId, title, description);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  const { pathname } = url;
  const segments = pathname.split('/');
  const roomId = segments[3];

  const session = await request.json();
  const { hintId } = session;
  const data = await service.dropHint(roomId, hintId);
  return NextResponse.json(data);
}
