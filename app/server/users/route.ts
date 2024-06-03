import { NextResponse } from 'next/server';

import * as service from './service';

export async function GET(_: Request) {
  const data = await service.getUser();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await request.json();
  const { countryCode, nickname } = session;
  const data = await service.createUser(countryCode, nickname);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const { roomId, userId } = session;
  const data = await service.deleteUser(roomId, userId);
  return NextResponse.json(data);
}
