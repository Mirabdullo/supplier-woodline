import { Model } from "sequelize-typescript";
import { ICompany } from "../interface/company.interface";
import { Warehouse } from "./warehouse.model";
export declare class Company extends Model<Company> implements ICompany {
    id: string;
    name: string;
    company_id: string;
    status: string;
    is_active: boolean;
    warehouse: Warehouse[];
}
