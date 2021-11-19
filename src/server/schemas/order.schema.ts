import mongoose from 'mongoose';
import type { Order } from '../../shared/models/order.model.js';

const {Schema, model} = mongoose

const orderSchema = new Schema<Order>({
  user: {type: mongoose.Types.ObjectId, ref: 'User'},
  items:[{type: mongoose.Types.ObjectId, ref: 'Product'}],
  total_price:{type: Number},
   item_count: {type: Number},
   
  
});

export const OrderModel = model<Order>('Order', orderSchema)