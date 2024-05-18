import type { IHint, IRoom } from './interfaces';
import * as repo from './repository';

export async function getRoom() {
  return repo.getRoom();
}

export async function createRoom({ name, setting }: Pick<IRoom, 'name' | 'setting'>) {
  try {
    const room: IRoom = {
      num: 123,
      adminId: '',
      userIds: [],
      hints: [],
      stockIds: [],
      name,
      setting,
    };
    await repo.createRoom(room);
    return { success: true, message: 'Room added successfully' };
  } catch (error) {
    return { success: false, message: 'Room added error' };
  }
}

export async function deleteRoom(id: string) {
  try {
    await repo.deleteRoom(id);
    return { success: true, message: 'Room added successfully' };
  } catch (error) {
    return { success: false, message: 'Room added error' };
  }
}

export async function addHint(roomId: string, hint: IHint) {
  try {
    await repo.addHintToRoom(roomId, hint);
    return { success: true, message: 'Hint added successfully' };
  } catch (error) {
    return { success: false, message: 'Hint added error' };
  }
}

export async function dropHint(roomId: string, hintId: string) {
  try {
    await repo.removeHintFromRoom(roomId, hintId);
    return { success: true, message: 'Hint delete successfully' };
  } catch (error) {
    return { success: false, message: 'Hint delete failed' };
  }
}

export async function addUser(roomId: string, userId: string) {
  try {
    await repo.addUserIdToRoom(roomId, userId);
    return { success: true, message: 'User added successfully' };
  } catch (error) {
    return { success: false, message: 'User added error' };
  }
}

export async function dropUser(roomId: string, userId: string) {
  try {
    await repo.removeUserIdFromRoom(roomId, userId);
    return { success: true, message: 'User delete successfully' };
  } catch (error) {
    return { success: false, message: 'User delete failed' };
  }
}

export async function addStock(roomId: string, stockId: string) {
  try {
    await repo.addStockIdToRoom(roomId, stockId);
    return { success: true, message: 'Stock added successfully' };
  } catch (error) {
    return { success: false, message: 'Stock added error' };
  }
}

export async function dropStock(roomId: string, stockId: string) {
  try {
    await repo.removeStockIdFromRoom(roomId, stockId);
    return { success: true, message: 'Stock drop successfully' };
  } catch (error) {
    return { success: false, message: 'Stock drop failed' };
  }
}
