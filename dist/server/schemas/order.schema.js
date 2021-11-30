import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const orderSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: 'User' },
    items: [
        {
            product: { type: mongoose.Types.ObjectId, ref: "Product" },
            quantity: Number,
        },
    ],
    total_amount: { type: Number },
    count: { type: Number },
});
export const OrderModel = model('Order', orderSchema);
//# sourceMappingURL=order.schema.js.map