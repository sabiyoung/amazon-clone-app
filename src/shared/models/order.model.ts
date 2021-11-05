import type mongoose from 'mongoose';
import type { Product } from './products.model';

export interface Order{
    _id: string;
   products:{
       priceSalesTime: number,
        product: Product;
   };
   total: number;

   
 
}