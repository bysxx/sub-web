import { NextResponse } from 'next/server';

import type { IRoom } from './interfaces';
import * as service from './service';

export async function GET(_: Request) {
  const data = await service.getRoom();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await request.json();
  const roomSetting: Pick<IRoom, 'name' | 'setting'> = { name: session.name, setting: session.setting };
  const data = await service.createRoom(roomSetting);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const { roomId } = session;
  const data = await service.deleteRoom(roomId);
  return NextResponse.json(data);
}
