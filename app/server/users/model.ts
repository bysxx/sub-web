import type { IUser } from 'app/server/user/interfaces';
import type { Model } from 'mongoose';
import mongoose, { model } from 'mongoose';

const userStockAssetSchema = new mongoose.Schema({
  stockId: { type: String, required: true },
  count: { type: Number, required: true },
  average: { type: Number, required: true },
});

const userSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  roomId: { type: String, required: true },
  stockAssets: [userStockAssetSchema],
  balance: { type: Number, required: true },
});

export default (mongoose.models.user || model<IUser>('user', userSchema)) as Model<IUser>;
