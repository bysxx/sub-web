import type { IRoom } from 'app/server/rooms/interfaces';
import type { Model } from 'mongoose';
import mongoose, { model } from 'mongoose';

const hintSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const settingSchema = new mongoose.Schema({
  maxUser: { type: Number, required: true },
  endDate: { type: Date, required: true },
  startBalance: { type: Number, required: true },
});

const roomSchema = new mongoose.Schema({
  countryCode: { type: Number, required: true },
  name: { type: String, required: true },
  adminId: { type: String, required: false },
  userIds: [{ type: String }],
  stockIds: [{ type: String }],
  hints: [hintSchema],
  setting: { type: settingSchema, required: true },
});

export default (mongoose.models.room || model<IRoom>('room', roomSchema)) as Model<IRoom>;
