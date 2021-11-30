import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const productSchema = new Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    quantity: { type: Number },
    rating: { type: String },
});
export const ProductModel = model('Product', productSchema);
//# sourceMappingURL=product.schema.js.map