import type { Model } from 'mongoose';
import mongoose, { model } from 'mongoose';

import type { IStock } from './interfaces';

const stockLogSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  date: { type: Date, required: true },
});

const stockSchema = new mongoose.Schema({
  price: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: Number, required: true },
  logs: [stockLogSchema],
});

export default (mongoose.models.Stock || model<IStock>('stock', stockSchema)) as Model<IStock>;
