import type * as mongoose from 'mongoose';
import type {User} from './user.model.js';

export interface Adress{
    _id: string;
    user?: User;
    firstName:string,
    lastName:string,
    adressLineOne: string,
    adressLineTwo:string,
    zipCode:number,
    state:string,
    city:string,
    phoneNumber:number,
    email: string

}