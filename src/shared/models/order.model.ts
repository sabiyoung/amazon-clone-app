import type * as mongoose from 'mongoose';
import type { Product } from './products.model.js';
import type { User } from './user.model.js';

export interface Order{
    _id: string;
    user?: User;
    items?:Product[];
   total_price?: number;
   item_count?: number;
   quantity?:number

   
}