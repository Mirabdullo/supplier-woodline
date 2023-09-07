import { Model } from "sequelize-typescript";
import { IDeals } from "../interface/deals.interface";
export declare class Deals extends Model<Deals> implements IDeals {
    id: string;
    deal_id: number;
    rest: number;
    copied: boolean;
    delivery_date: Date;
    is_active: boolean;
    status: string;
    company_id: string;
}
