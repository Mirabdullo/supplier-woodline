import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { IOrder } from "../interface/order.interface";
import { Models } from "./model.model";
import { Deals } from "./deal.model";

@Table({ timestamps: true, tableName: "order_log" })
export class OrderLog extends Model<OrderLog> implements IOrder {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;
    
    @Column({type: DataType.UUID, allowNull: false})
    order_id: string;
    
    @Column({type: DataType.STRING})
    status: string;

    @Column({type: DataType.STRING})
    cathegory: string;

    @Column({type: DataType.STRING})
    tissue: string;

    @Column({type: DataType.STRING})
    title: string;

    @Column({type: DataType.DECIMAL})
    cost: number;

    @Column({type: DataType.DECIMAL})
    sale: number;

    @Column({type: DataType.DECIMAL})
    qty: number;

    @Column({type: DataType.DECIMAL})
    sum: number;

    @Column({type: DataType.BOOLEAN})
    is_first: boolean;

    @Column({type: DataType.BOOLEAN})
    copied: boolean;

    @Column({type: DataType.BOOLEAN})
    is_active: boolean;

    @Column({type: DataType.STRING, allowNull: true})
    end_date?: Date;

    @Column({type: DataType.UUID, allowNull: true})
    seller_id?: string;

}
