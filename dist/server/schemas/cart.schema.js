import mongoose from "mongoose";
const { Schema, model } = mongoose;
const cartSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    items: [
        {
            product: { type: mongoose.Types.ObjectId, ref: "Product" },
            quantity: Number,
        },
    ],
}, { timestamps: true });
cartSchema.virtual("count").get(function () {
    return this.items.reduce((acc, item) => acc + item.quantity, 0);
});
cartSchema.virtual("total_amount").get(function () {
    return this.items.reduce((amount, item) => {
        return (item.product.price * item.quantity) + amount;
    }, 0);
});
cartSchema.set(`toObject`, { virtuals: true });
cartSchema.set(`toJSON`, { virtuals: true });
export const CartModel = model("Cart", cartSchema);
//# sourceMappingURL=cart.schema.js.map