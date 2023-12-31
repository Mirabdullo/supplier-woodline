import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IProduct } from "../interface/product.interface";
import { Warehouse } from "./warehouse.model";
import { Order } from "./order.model";

@Table({ timestamps: true, tableName: "storeproducts" })
export class Product extends Model<Product> implements IProduct {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @ForeignKey(() => Order)
    @Column({ type: DataType.UUID, allowNull: false })
    order_id: string;
    @BelongsTo(() => Order)
    order: Order;

    @ForeignKey(() => Warehouse)
    @Column({ type: DataType.UUID, allowNull: false })
    warehouse_id: string;
    @BelongsTo(() => Warehouse)
    warehouse: Warehouse;

    // @Column({ type: DataType.BOOLEAN, defaultValue: false })
    // is_copied: boolean;

    @Column({ type: DataType.BOOLEAN, defaultValue: true })
    is_active: boolean;

    
}
