import dbConnect from 'app/server/db-connect';
import { startSession } from 'mongoose';

import * as roomRepo from '../rooms/repository';
import * as stockRepo from '../stocks/repository';
import type { IUser, IUserStockAsset } from './interfaces';
import * as userRepo from './repository';

export async function getUser() {
  try {
    const product = await userRepo.getUser();

    return { success: true, message: 'user find successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function getOneUser(userId: string) {
  try {
    const product = await userRepo.findUserDetailById(userId);

    return { success: true, message: 'user find successfully', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function getTotalBalanceByUser(userId: string) {
  try {
    const user = await userRepo.findUserDetailById(userId);
    if (!user) throw new Error('User dose not exist');

    const stockValues = await Promise.all(
      user.stockAssets.map(async (asset) => {
        const stock = await stockRepo.findStockDetailById(asset.stockId);
        return stock ? stock.price * asset.count : 0;
      }),
    );

    // 유저의 잔고와 주식 자산의 합계
    const product = user.balance + stockValues.reduce((acc, value) => acc + value, 0);

    return { success: true, message: 'TotalBalance', product };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function getStockChipByUserAndStock(userId: string, stockId: string) {
  try {
    const user = await userRepo.findUserDetailById(userId);
    if (!user) throw new Error('User dose not exist');
    const stock = await stockRepo.findStockDetailById(stockId);
    if (!stock) throw new Error('Stock dose not exist');
    const stockAsset = user.stockAssets.find((asset) => asset.stockId === stockId);
    if (!stockAsset) throw new Error('User stockAsset dose not exist');
    // 유저의 잔고와 주식 자산의 합계
    const Valuation = stockAsset.count * stockAsset.average;
    const ROI = (stock.price - stockAsset.average) / stockAsset.average;

    return {
      success: true,
      message: 'StockChip',
      product: {
        Valuation,
        ROI,
      },
    };
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export async function createUser(countryCode: number, nickname: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const user = await userRepo.findUserDetailBynickname(nickname);
    const room = await roomRepo.findRoomDetailByCountryCode(countryCode);
    if (!room) throw new Error('Room dose not exist');
    const roomId = room._id.toString();
    if (user && user.roomId === roomId) {
      await session.commitTransaction();
      session.endSession();
      return { success: true, message: 'User already exists', product: user };
    }
    const newUser: IUser = {
      nickname,
      roomId,
      stockAssets: [],
      balance: room.setting.startBalance,
    };
    const product = await userRepo.createUser(newUser);
    await roomRepo.addUserIdToRoom(roomId, product._id.toString());
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'User create successfully', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: (error as Error).message };
  }
}

export async function buyStock(userId: string, stockId: string, buyCount: number) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const user = await userRepo.findUserDetailById(userId);
    if (!user) throw new Error('User dose not exist');
    const stock = await stockRepo.findStockDetailById(stockId);
    if (!stock) throw new Error('Stock dose not exist');
    if (user.balance < stock.price * buyCount) throw new Error('too less balance');

    const stockAsset = await userRepo.findStockAssetByUserIdAndStockId(userId, stockId);
    let updatedStockAsset;
    if (!stockAsset) {
      const newStockAsset: IUserStockAsset = {
        stockId,
        count: buyCount,
        average: stock.price,
      };
      updatedStockAsset = await userRepo.addStockAssetToUser(userId, newStockAsset);
    } else {
      const newCount = stockAsset.count + buyCount;
      const newAverage =
        (stockAsset.average * stockAsset.count + stock.price * buyCount) / (stockAsset.count + buyCount);
      updatedStockAsset = await userRepo.updateStockAssetByUser(userId, stockId, newCount, newAverage);
    }
    const newBalace = user.balance - stock.price * buyCount;
    const newUser: IUser = {
      nickname: user.nickname,
      roomId: user.roomId,
      stockAssets: updatedStockAsset.stockAssets,
      balance: newBalace,
    };
    const product = await userRepo.updateUser(userId, newUser);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock purchased successfully.', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: (error as Error).message };
  }
}

export async function sellStock(userId: string, stockId: string, sellCount: number) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    const user = await userRepo.findUserDetailById(userId);
    if (!user) throw new Error('User dose not exist');
    const stock = await stockRepo.findStockDetailById(stockId);
    // 주식 자체가 없음.
    if (!stock) throw new Error('stock not exist');
    const stockAsset = await userRepo.findStockAssetByUserIdAndStockId(userId, stockId);
    // 주식 보유하지 않음
    if (!stockAsset) throw new Error('no have stock');

    // 주식 이미 보유, 수량 감소
    if (stockAsset.count < sellCount) throw new Error('too less stock count');
    const newCount = stockAsset.count - sellCount;
    const newAverage = stockAsset.average;
    const updatedStockAsset = await userRepo.updateStockAssetByUser(userId, stockId, newCount, newAverage);

    const newBalace = user.balance + stock.price * sellCount;
    const newUser: IUser = {
      nickname: user.nickname,
      roomId: user.roomId,
      stockAssets: updatedStockAsset.stockAssets,
      balance: newBalace,
    };
    const product = await userRepo.updateUser(userId, newUser);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'Stock purchased successfully.', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: (error as Error).message };
  }
}

export async function deleteUser(roomId: string, userId: string) {
  await dbConnect();
  const session = await startSession();
  session.startTransaction();
  try {
    await roomRepo.removeUserIdFromRoom(roomId, userId);
    const product = await userRepo.deleteUser(userId);
    await session.commitTransaction();
    session.endSession();
    return { success: true, message: 'User create successfully', product };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return { success: false, message: (error as Error).message };
  }
}
