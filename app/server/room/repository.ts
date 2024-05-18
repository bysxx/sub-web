import dbConnect from 'app/server/db-connect';
import type { IHint, IRoom } from 'app/server/room/interfaces';

import Room from './model';

export const createRoom = async (room: IRoom) => {
  await dbConnect();
  const data = await Room.create(room);
  return data;
};

export const getRoom = async () => {
  await dbConnect();
  const data = await Room.find({});

  return data;
};

export const findRoomDetailById = async (id: string) => {
  await dbConnect();
  return Room.findOne({ _id: id });
};

export const updateRoom = async (roomId: string, updateData: IRoom) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, updateData, { new: true });
};

export const deleteRoom = async (id: string) => {
  await dbConnect();
  return Room.findByIdAndDelete(id);
};

export const addHintToRoom = async (roomId: string, hint: IHint) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $push: { hints: hint } }, { new: true });
};

export const getHintByRoom = async (roomId: string) => {
  await dbConnect();
  const room = await findRoomDetailById(roomId);
  if (!room) throw Error('Room not found');
  return room?.hints;
};

export const removeHintFromRoom = async (roomId: string, hintId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $pull: { hints: { _id: hintId } } }, { new: true });
};

export const addUserIdToRoom = async (roomId: string, userId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $push: { userIds: userId } }, { new: true });
};

export const getUserIdByRoom = async (roomId: string) => {
  await dbConnect();
  const room = await findRoomDetailById(roomId);
  if (!room) throw Error('Room not found');
  return room?.userIds;
};

export const removeUserIdFromRoom = async (roomId: string, userId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $pull: { userIds: userId } }, { new: true });
};

export const addStockIdToRoom = async (roomId: string, stockId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $push: { stockIds: stockId } }, { new: true });
};

export const getStockIdByRoom = async (roomId: string) => {
  await dbConnect();
  const room = await findRoomDetailById(roomId);
  if (!room) throw Error('Room not found');
  return room?.stockIds;
};

export const removeStockIdFromRoom = async (roomId: string, stockId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $pull: { stockIds: stockId } }, { new: true });
};
