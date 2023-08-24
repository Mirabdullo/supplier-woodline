import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ICompany } from "../interface/company.interface";
import { Warehouse } from "./warehouse.model";

@Table({ timestamps: true, tableName: "companies" })
export class Company extends Model<Company> implements ICompany {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    
    @Column({type: DataType.UUID, allowNull: false})
    company_id: string;

    @Column({type: DataType.STRING, defaultValue: "new"})
    status: string;

    @Column({type: DataType.BOOLEAN, defaultValue: true})
    is_active: boolean;

    @HasMany(() => Warehouse)
    warehouse: Warehouse[]
}
