import * as stockRepo from '../stocks/repository';
import type { IHint, IRoom, ISetting } from './interfaces';
import * as repo from './repository';

export async function getRoom() {
  return repo.getRoom();
}

export async function createRoom(name: string, setting: ISetting) {
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
    const product = await repo.createRoom(room);
    return { success: true, message: 'Room added successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteRoom(roomId: string) {
  try {
    const product = await repo.deleteRoom(roomId);
    return { success: true, message: 'Room deleted successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// 특정방에 존재하는 힌트 조회
export async function getHint(roomId: string) {
  try {
    const product = await repo.getHintByRoom(roomId);
    return { success: true, message: 'Hint find successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function addHint(roomId: string, userId: string, title: string, description: string) {
  try {
    const hint: IHint = {
      userId,
      title,
      description,
    };
    const product = await repo.addHintToRoom(roomId, hint);
    return { success: true, message: 'Hint added successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function dropHint(roomId: string, hintId: string) {
  try {
    const product = await repo.removeHintFromRoom(roomId, hintId);
    return { success: true, message: 'Hint delete successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// 특정방에 존재하는 유저 조회
export async function getUser(roomId: string) {
  try {
    const product = await repo.getUserIdByRoom(roomId);
    return { success: true, message: 'User find successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function addUser(roomId: string, userId: string) {
  try {
    const product = await repo.addUserIdToRoom(roomId, userId);
    return { success: true, message: 'User added successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function dropUser(roomId: string, userId: string) {
  try {
    const product = await repo.removeUserIdFromRoom(roomId, userId);
    return { success: true, message: 'User delete successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

// 특정방에 존재하는 주식Id조회
export async function getStock(roomId: string) {
  try {
    const stockIds = await repo.getStockIdByRoom(roomId);
    const stocks = await stockRepo.getStockByIds(stockIds);

    return { success: true, message: 'Stock find successfully', stocks };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function addStock(roomId: string, stockId: string) {
  try {
    const product = await repo.addStockIdToRoom(roomId, stockId);
    return { success: true, message: 'Stock added successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function dropStock(roomId: string, stockId: string) {
  try {
    const product = await repo.removeStockIdFromRoom(roomId, stockId);
    return { success: true, message: 'Stock drop successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
