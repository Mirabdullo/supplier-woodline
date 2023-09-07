import { Model } from "sequelize-typescript";
import { IWarehouse } from "../interface/warehouse.interface";
import { Company } from "./company.model";
import { Product } from "./product.model";
import { User } from "./user.model";
export declare class Warehouse extends Model<Warehouse> implements IWarehouse {
    id: string;
    name: string;
    company_id: string;
    company: Company;
    admin: string;
    user: User;
    status: string;
    type: string;
    deletedAt: string;
    products: Product[];
}
