import dbConnect from 'app/server/db-connect';

import type { IUser } from './interfaces';
import User from './model';

export const createUser = async (user: IUser) => {
  await dbConnect();
  return User.create(user);
};

export const getUser = async () => {
  await dbConnect();
  return User.find({});
};

export const findUserDetailById = async (id: string) => {
  await dbConnect();
  return User.findOne({ _id: id });
};

export const updateUser = async (userId: string, newBalace: number) => {
  await dbConnect();
  return User.findByIdAndUpdate(userId, { balance: newBalace }, { new: true });
};

export const deleteUser = async (id: string) => {
  await dbConnect();
  await User.findByIdAndDelete(id);
};

export const addStockAssetToUser = async (userId: string, stockAsset: IUserStockAsset) => {
  await dbConnect();
  return User.findByIdAndUpdate(userId, { $push: { stockAssets: stockAsset } }, { new: true });
};

export const getStockAssetByUser = async (userId: string) => {
  await dbConnect();
  const user = await findUserDetailById(userId);
  if (!user) throw Error('User not found');
  return user?.userAssets;
};

export const findStockAssetByUserIdAndStockId = async (userId: string, stockId: string) => {
  await dbConnect();
  const user = await User.findOne({ _id: userId, 'stockAssets.stockId': stockId }, { 'stockAssets.$': 1 }); // 세션을 옵션으로 포함
  if (!user || !user.stockAssets || user.stockAssets.length === 0) {
    return null;
  }
  return user.stockAssets[0];
};

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
