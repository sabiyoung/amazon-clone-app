import type * as mongoose from 'mongoose';
import type {User} from './user.model.js';
import type { Product } from './products.model.js';
export interface Cart{
    _id: string;
    user?: User;
    items:{product:Product, quantity:number} [];
    count?:number;
    total_amount?: number;
  

   
 
}