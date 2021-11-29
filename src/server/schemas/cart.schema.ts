import mongoose from "mongoose";
import type { Cart } from "../../shared/models/cart.model.js";
import type { Product } from "../../shared/models/products.model.js";

const { Schema, model } = mongoose;

const cartSchema = new Schema<Cart>({
  user: { type: mongoose.Types.ObjectId, ref: "User" },
  items: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      quantity: Number,
    },
  ],
}, {timestamps:true});

cartSchema.virtual("count").get(function (this: Cart) {
  return this.items.reduce((acc, item) =>acc + item.quantity,0 )
});

cartSchema.virtual("total_amount").get(function (this: Cart) {
  return this.items.reduce((amount: number, item: {product: Product, quantity: number}
    ) => {
    return (item.product.price * item.quantity) + amount;
  }, 0);
});

cartSchema.set(`toObject`, { virtuals: true });
cartSchema.set(`toJSON`, { virtuals: true });

export const CartModel = model<Cart>("Cart", cartSchema);
