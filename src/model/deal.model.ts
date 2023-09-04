import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "./user.model";
import { IDeals } from "../interface/deals.interface";
import { Order } from "./order.model";

@Table({ timestamps: true, tableName: "deals" })
export class Deals extends Model<Deals> implements IDeals {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({ type: DataType.NUMBER, allowNull: false })
    deal_id: number;


    @Column({ type: DataType.DECIMAL, allowNull: false })
    rest: number;
    
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    copied: boolean;
    
    @Column({ type: DataType.DATE, defaultValue: new Date()})
    delivery_date: Date;
    
    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
    is_active: boolean;
    
    @Column({ type: DataType.STRING, defaultValue: "NEW" })
    status: string;
    
    @Column({ type: DataType.UUID, allowNull: false })
    company_id: string;

}
