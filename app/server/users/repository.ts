import dbConnect from 'app/server/db-connect';

import type { IUser, IUserStockAsset } from './interfaces';
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

export const getUserByIds = async (userIds: string[]) => {
  await dbConnect();
  const users = await User.find({ _id: { $in: userIds } });

  return users;
};

// id에 맞는 유저 조회
export const findUserDetailById = async (id: string) => {
  await dbConnect();
  try {
    const data = await User.findOne({ _id: id });
    return data;
  } catch (error) {
    throw new Error('user dose not exist');
  }
};

// 유저 데이터 업데이트
export const updateUser = async (userId: string, newUser: IUser) => {
  await dbConnect();
  try {
    const data = await User.findByIdAndUpdate(userId, newUser, { new: true });

    return data;
  } catch (error) {
    throw new Error('user dose not exist');
  }
};

// 특정 유저 삭제
export const deleteUser = async (id: string) => {
  await dbConnect();
  try {
    const data = await User.findByIdAndDelete(id);

    return data;
  } catch (error) {
    throw new Error('user delete failed');
  }
};

// 특정 유저의 stockAssets 추가
export const addStockAssetToUser = async (userId: string, stockAsset: IUserStockAsset) => {
  await dbConnect();
  try {
    const data = await User.findByIdAndUpdate(userId, { $push: { stockAssets: stockAsset } }, { new: true });

    return data;
  } catch (error) {
    throw new Error('User stockAsset add failed');
  }
};

// 특정 유저의 stockAssets 모두 조회
export const getStockAssetByUser = async (userId: string) => {
  await dbConnect();
  try {
    const user = await findUserDetailById(userId);
    return user?.stockAssets;
  } catch (error) {
    return new Error('User dose not found');
  }
};

// 특정 유저의 특정 주식 stockAssets 조회
export const findStockAssetByUserIdAndStockId = async (userId: string, stockId: string) => {
  await dbConnect();
  try {
    const user = await User.findOne({ _id: userId, 'stockAssets.stockId': stockId }, { 'stockAssets.$': 1 });
    if (!user) throw new Error('User dose not exist');
    if (!user.stockAssets) return null;
    return user.stockAssets[0];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

// 특정 유저의 특정 주식 stockAssets 업데이트
export const updateStockAssetByUser = async (userId: string, stockId: string, newCount: number, newAverage: number) => {
  await dbConnect();
  try {
    const data = await User.findOneAndUpdate(
      { _id: userId, 'stockAssets.stockId': stockId },
      {
        $set: {
          'stockAssets.$.count': newCount,
          'stockAssets.$.average': newAverage,
        },
      },
      { new: true },
    );

    return data;
  } catch (error) {
    throw new Error('User stockAsset update failed');
  }
};
