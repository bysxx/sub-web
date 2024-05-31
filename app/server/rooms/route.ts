import type { ISetting } from 'app/server/rooms/interfaces';
import { NextResponse } from 'next/server';

import * as service from './service';

export async function GET(_: Request) {
  const data = await service.getRoom();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await request.json();
  const name = session.name as string;
  const setting = session.setting as ISetting;
  const data = await service.createRoom(name, setting);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const roomId = session.roomId as string;
  const data = await service.deleteRoom(roomId);
  return NextResponse.json(data);
}
