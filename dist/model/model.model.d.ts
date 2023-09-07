import { Model } from "sequelize-typescript";
import { IModel } from "../interface/model.interface";
import { Company } from "./company.model";
import { FurnitureType } from "./furnitureType.model";
export declare class Models extends Model<Models> implements IModel {
    id: string;
    name: string;
    price: number;
    sale: number;
    code: string;
    is_active: boolean;
    company_id: string;
    company: Company;
    type_id: string;
    type: FurnitureType;
    status: string;
}
