import mongoose from 'mongoose';
import type { Cart } from '../../shared/models/cart.model.js';

const {Schema, model} = mongoose

const cartSchema = new mongoose.Schema<Cart>({
user: {type: mongoose.Types.ObjectId, ref: 'User'},
items:[{price:Number, product: {type: mongoose.Types.ObjectId, ref: 'InventoryItem'}}],

  
});

export const CartModel = model<Cart>('Cart', cartSchema)