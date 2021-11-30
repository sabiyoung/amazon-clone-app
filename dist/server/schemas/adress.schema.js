import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const adressSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    adressLineOne: { type: String, required: true },
    adressLineTwo: { type: String },
    zipCode: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
}, { timestamps: true });
export const AdressModel = model('Adress', adressSchema);
//# sourceMappingURL=adress.schema.js.map