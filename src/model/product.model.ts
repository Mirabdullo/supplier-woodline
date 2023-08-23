import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IProduct } from "../interface/product.interface";

@Table({ timestamps: true, tableName: "storeproducts" })
export class Product extends Model<Product> implements IProduct {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({type: DataType.UUID, allowNull: false})
    order_id: string;
    
    @Column({type: DataType.UUID, allowNull: false})
    warehouse_id: string;

    @Column({type: DataType.BOOLEAN, defaultValue: false})
    is_copied: boolean;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    is_active: boolean;
}
