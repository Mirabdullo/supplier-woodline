import { Model } from "sequelize-typescript";
import { IOrder } from "../interface/order.interface";
import { Models } from "./model.model";
import { Deals } from "./deal.model";
export declare class Order extends Model<Order> implements IOrder {
    id: string;
    order_id: string;
    cathegory: string;
    tissue: string;
    title: string;
    cost: number;
    sale: number;
    qty: number;
    sum: number;
    deal_id: string;
    deal: Deals;
    is_first: boolean;
    copied: boolean;
    status: string;
    is_active: boolean;
    end_date?: Date;
    seller_id?: string;
    model_id: string;
    model: Models;
}
