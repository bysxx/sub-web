import dbConnect from 'app/server/db-connect';

import type { IUser } from './interfaces';
import User from './model';

// 유저 추가
export const createUser = async (user: IUser) => {
  await dbConnect();
  return User.create(user);
};

// 모든 유저 조회
export const getUser = async () => {
  await dbConnect();
  return User.find({});
};

// id에 맞는 유저 조회
export const findUserDetailById = async (id: string) => {
  await dbConnect();
  return User.findOne({ _id: id });
};

// 유저 데이터 업데이트
export const updateUser = async (userId: string, newUser: IUser) => {
  await dbConnect();
  return User.findByIdAndUpdate(userId, newUser, { new: true });
};

// 특정 유저 삭제
export const deleteUser = async (id: string) => {
  await dbConnect();
  await User.findByIdAndDelete(id);
};

// 특정 유저의 stockAssets 추가
export const addStockAssetToUser = async (userId: string, stockAsset: IUserStockAsset) => {
  await dbConnect();
  return User.findByIdAndUpdate(userId, { $push: { stockAssets: stockAsset } }, { new: true });
};

// 특정 유저의 stockAssets 모두 조회
export const getStockAssetByUser = async (userId: string) => {
  await dbConnect();
  try {
    const user = await findUserDetailById(userId);
    return user?.userAssets;
  } catch (error) {
    return new Error('User dose not found');
  }
};

// 특정 유저의 특정 주식 stockAssets 조회
export const findStockAssetByUserIdAndStockId = async (userId: string, stockId: string) => {
  await dbConnect();
  try {
    const user = await User.findOne({ _id: userId, 'stockAssets.stockId': stockId }, { 'stockAssets.$': 1 });
    if (!user || !user.stockAssets) return null;
    return user.stockAssets[0];
  } catch (error) {
    return new Error('StockAssets dose not found');
  }
};

// 특정 유저의 특정 주식 stockAssets 업데이트
export const updateStockAssetByUser = async (userId: string, stockId: string, newCount: number, newAverage: number) => {
  await dbConnect();
  return User.findOneAndUpdate(
    { _id: userId, 'stockAssets.stockId': stockId },
    {
      $set: {
        'stockAssets.$.count': newCount,
        'stockAssets.$.average': newAverage,
      },
    },
    { new: true },
  );
};
