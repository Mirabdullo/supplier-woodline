import { Model } from "sequelize-typescript";
import { IUser } from "../interface/user.interface";
export declare class User extends Model<User> implements IUser {
    id: string;
    name: string;
    phone: string;
    password: string;
    company_id: string;
    role: string;
    comp_id?: string;
    is_active: boolean;
}
