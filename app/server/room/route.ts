import { NextResponse } from 'next/server';

import type { IRoom } from './interfaces';
import * as service from './service';

export async function GET(_: Request) {
  const data = await service.getRoom();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await request.json();
  const data: Pick<IRoom, 'name' | 'setting'> = { name: session.name, setting: session.setting };
  await service.createRoom(data);
  return NextResponse.json(``);
}

export async function PATCH(request: Request) {
  const session = await request.json();
  const { roomId, hint } = session;
  if (!roomId) {
    return NextResponse.json({ response: 'no id' });
  }
  if (hint) {
    const data = await service.addHint(roomId, hint);
    return NextResponse.json(data);
  }
  return NextResponse.json(``);
}

export async function DELETE(request: Request) {
  const session = await request.json();
  const { roomId, hintId } = session;
  if (!roomId) {
    return NextResponse.json({ response: 'no id' });
  }
  if (hintId) {
    const data = await service.dropHint(roomId, hintId);
    return NextResponse.json(data);
  }
  return NextResponse.json(``);
}
