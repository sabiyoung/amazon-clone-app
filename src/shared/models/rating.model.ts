import type * as mongoose from 'mongoose';
import type { Product } from './products.model.js';
export interface Rating{
  _id?: number;
 comment: string;
 rating?:[]
  product?: Product;
  productID?:{type: mongoose.Types.ObjectId}

}