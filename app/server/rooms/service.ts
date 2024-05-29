import type { IRoom } from './interfaces';
import * as repo from './repository';

export async function getRoom() {
  return repo.getRoom();
}

export async function createRoom({ name, setting }: Pick<IRoom, 'name' | 'setting'>) {
  try {
    const room: IRoom = {
      countryCode: 123,
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
    return { success: false, message: error.message };
  }
}

export async function deleteRoom(id: string) {
  try {
    await repo.deleteRoom(id);
    return { success: true, message: 'Room deleted successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 특정방에 존재하는 힌트 조회
export async function getHint(roomId: string) {
  try {
    return await repo.getHintByRoom(roomId);
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function addHint(roomId: string, userId: string, title: string, description: string) {
  try {
    const hint: IHint = {
      userId,
      title,
      description,
    };
    await repo.addHintToRoom(roomId, hint);
    return { success: true, message: 'Hint added successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function dropHint(roomId: string, hintId: string) {
  try {
    await repo.removeHintFromRoom(roomId, hintId);
    return { success: true, message: 'Hint delete successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 특정방에 존재하는 유저 조회
export async function getUser(roomId: string) {
  try {
    await repo.getUserIdByRoom(roomId);
    return { success: true, message: 'User added successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function addUser(roomId: string, userId: string) {
  try {
    await repo.addUserIdToRoom(roomId, userId);
    return { success: true, message: 'User added successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function dropUser(roomId: string, userId: string) {
  try {
    await repo.removeUserIdFromRoom(roomId, userId);
    return { success: true, message: 'User delete successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 특정방에 존재하는 주식Id조회
export async function getStock(roomId: string) {
  try {
    await repo.getStockIdByRoom(roomId);
    return { success: true, message: 'Stock added successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function addStock(roomId: string, stockId: string) {
  try {
    await repo.addStockIdToRoom(roomId, stockId);
    return { success: true, message: 'Stock added successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export async function dropStock(roomId: string, stockId: string) {
  try {
    await repo.removeStockIdFromRoom(roomId, stockId);
    return { success: true, message: 'Stock drop successfully' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
