import { NextResponse } from 'next/server';

import * as service from '../service';

export async function GET(request: Request) {
  const url = new URL(request.url, `http://${request.headers.host}`);

  const { pathname } = url;
  const segments = pathname.split('/');
  const stockId = segments[3];
  const data = await service.getOneStock(stockId);

  return NextResponse.json(data);
}

// export async function POST(request: Request) {
//   const url = new URL(request.url, `http://${request.headers.host}`);
//   const { pathname } = url;
//   const segments = pathname.split('/');
//   const roomId = segments[3];

//   const session = await request.json();
//   const { price, value, name, description, valuePerRate } = session;
//   const data = await service.createStock(roomId, price, value, name, description, valuePerRate);
//   return NextResponse.json(data);
// }

// export async function PATCH(request: Request) {
//   const session = await request.json();
//   const { stockId, newValue } = session;
//   const data = await service.updateStockValue(stockId, newValue);
//   return NextResponse.json(data);
// }

// export async function DELETE(request: Request) {
//   const url = new URL(request.url, `http://${request.headers.host}`);
//   const { pathname } = url;
//   const segments = pathname.split('/');
//   const roomId = segments[3];

//   const session = await request.json();
//   const { stockId } = session;
//   await service.deleteStock(roomId, stockId);
//   return NextResponse.json(``);
// }
