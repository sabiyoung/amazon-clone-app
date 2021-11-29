import mongoose from 'mongoose';
import type { Order } from '../../shared/models/order.model.js';

const {Schema, model} = mongoose

const orderSchema = new Schema<Order>({
  user: {type: mongoose.Types.ObjectId, ref: 'User'},
  items: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
  total_amount:{type: Number},
   count: {type: Number},
 
});

export const OrderModel = model<Order>('Order', orderSchema)