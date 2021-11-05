import type mongoose from 'mongoose';
import type {User} from './user.model.js';
export interface Cart{
    _id: string;
    user: {type: mongoose.Types.ObjectId} | User;
    items:[]
 
}