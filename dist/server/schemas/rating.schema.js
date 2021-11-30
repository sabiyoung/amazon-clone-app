import mongoose from "mongoose";
const { Schema, model } = mongoose;
const rateSchema = new Schema({
    comment: { type: String, require: true },
    productID: { type: mongoose.Types.ObjectId, ref: 'Product' },
    rating: { type: [] }
});
export const RateModel = model("Rate", rateSchema);
//# sourceMappingURL=rating.schema.js.map