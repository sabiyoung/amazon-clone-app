import mongoose from "mongoose";
import type { Rating } from "../../shared/models/rating.model.js";

const { Schema, model } = mongoose;

const rateSchema = new Schema<Rating>({
    comment: {type: String, require: true},
    productID: {type: mongoose.Types.ObjectId, ref: 'Product'},
    rating:{type:[]}

});
export const RateModel = model<Rating>("Rate", rateSchema);
