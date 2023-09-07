import { Model } from "sequelize-typescript";
import { IProduct } from "../interface/product.interface";
import { Warehouse } from "./warehouse.model";
import { Order } from "./order.model";
export declare class Product extends Model<Product> implements IProduct {
    id: string;
    order_id: string;
    order: Order;
    warehouse_id: string;
    warehouse: Warehouse;
    is_copied: boolean;
    is_active: boolean;
}
