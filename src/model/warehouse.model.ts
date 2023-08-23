import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { IWarehouse } from "../interface/warehouse.interface";
import { Company } from "./company.model";

@Table({ timestamps: true, tableName: "warehouse" })
export class Warehouse extends Model<Warehouse> implements IWarehouse {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ForeignKey(() => Company)
    @Column({type: DataType.UUID, allowNull: false})
    company_id: string;

    @Column({type: DataType.UUID, allowNull: false})
    admin: string;

    @Column({type: DataType.STRING, defaultValue: "NEW"})
    status: string;

    @Column({type: DataType.STRING, defaultValue: "склад"})
    type: string;
}
