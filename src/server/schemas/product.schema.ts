import mongoose from 'mongoose';
import type { Product } from '../../shared/models/products.model.js';
const {Schema, model} = mongoose

const productSchema = new Schema<Product>({
   title: {type: String, required: true},
   price:{type: Number, required: true},
   image: {type: String, required: true},
    description: {type: String, required: true},
    quantity:{type:Number},
    rating: {type: String},
});

export const ProductModel = model<Product>('Product', productSchema)