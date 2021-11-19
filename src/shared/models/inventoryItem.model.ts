import type mongoose from 'mongoose';
import type { Product } from './products.model.js';
export interface Inventory{
    _id: string;
     product: {type: mongoose.Types.ObjectId} | Product;
     shipped: boolean;
     priceAtSale: number;
     damaged: boolean;
    sold: boolean;
     discount: number
   
}