import mongoose from 'mongoose';

import type {  Inventory } from '../../shared/models/inventoryItem.model.js';

const {Schema, model} = mongoose

const inventoryItemSchema = new mongoose.Schema<Inventory>({
product: {type: mongoose.Types.ObjectId, ref: 'Product'},
shipped: {type:Boolean, required:true},
damaged: {type:Boolean, required:true},
discount: {type: Number, required:true},
priceAtSale: {type: Number, required:true}
  
});

export const InventoryItemModel = model<Inventory>('InventoryItem', inventoryItemSchema)