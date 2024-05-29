import dbConnect from 'app/server/db-connect';
import type { IHint, IRoom } from 'app/server/room/interfaces';

import Room from './model';

// 방 생성
export const createRoom = async (room: IRoom) => {
  await dbConnect();
  const data = await Room.create(room);
  return data;
};

// 모든 방 조회
export const getRoom = async () => {
  await dbConnect();
  const data = await Room.find({});

  return data;
};

// id로 방 조회
export const findRoomDetailById = async (id: string) => {
  await dbConnect();
  return Room.findOne({ _id: id });
};

// contryCode로 방 조회
export const findRoomDetailByCountryCode = async (countryCode: number) => {
  await dbConnect();
  return Room.findOne({ countryCode });
};

// roomId에 해당하는 방 정보 수정
export const updateRoom = async (roomId: string, updateData: IRoom) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, updateData, { new: true });
};

// id에 해당하는 방 삭제
export const deleteRoom = async (id: string) => {
  await dbConnect();
  return Room.findByIdAndDelete(id);
};

// roomId에 해당하는 방에 hint생성
export const addHintToRoom = async (roomId: string, hint: IHint) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $push: { hints: hint } }, { new: true });
};

// roomId에 해당하는 방의 hint 반환
export const getHintByRoom = async (roomId: string) => {
  await dbConnect();
  try {
    const room = await findRoomDetailById(roomId);
    return room.hints;
  } catch (error) {
    throw new Error('Room dose not exist');
  }
};

// roomId에 해당하는 방을 찾고 hintId에 해당하는 힌트를 제거
export const removeHintFromRoom = async (roomId: string, hintId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $pull: { hints: { _id: hintId } } }, { new: true });
};

// roomId에 해당하는 방을 찾고 userId를 추가
export const addUserIdToRoom = async (roomId: string, userId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $push: { userIds: userId } }, { new: true });
};

// roomId에 해당하는 방을 찾고 모든userId를 조회
export const getUserIdByRoom = async (roomId: string) => {
  await dbConnect();
  const room = await findRoomDetailById(roomId);
  if (!room) throw Error('Room not found');
  return room.userIds;
};

// roomId에 해당하는 방을 찾고 userId에 해당하는 유저삭제
export const removeUserIdFromRoom = async (roomId: string, userId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $pull: { userIds: userId } }, { new: true });
};

// roomId에 해당하는 방을 찾고 stockId를 추가
export const addStockIdToRoom = async (roomId: string, stockId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $push: { stockIds: stockId } }, { new: true });
};

// roomId에 해당하는 방을 찾고 모든 stockId를 조회
export const getStockIdByRoom = async (roomId: string) => {
  await dbConnect();
  try {
    const room = await findRoomDetailById(roomId);
    return room.stockIds;
  } catch (error) {
    throw new Error('Room dose not exist');
  }
};

// roomId에 해당하는 방을 찾고 stockId에 해당하는 stock삭제
export const removeStockIdFromRoom = async (roomId: string, stockId: string) => {
  await dbConnect();
  return Room.findByIdAndUpdate(roomId, { $pull: { stockIds: stockId } }, { new: true });
};
