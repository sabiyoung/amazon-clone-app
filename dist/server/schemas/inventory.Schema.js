import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const inventoryItemSchema = new mongoose.Schema({
    product: { type: mongoose.Types.ObjectId, ref: 'Product' },
    shipped: { type: Boolean, required: true },
    damaged: { type: Boolean, required: true },
    sold: { type: Boolean, required: true },
    discount: { type: Number, required: true },
    priceAtSale: { type: Number, required: true }
});
export const InventoryItemModel = model('InventoryItem', inventoryItemSchema);
//# sourceMappingURL=inventory.Schema.js.map