import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ICompany } from "../interface/company.interface";

@Table({ timestamps: true, tableName: "sellers" })
export class Company extends Model<Company> implements ICompany {
    @Column({
        type: DataType.STRING,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    
    @Column({type: DataType.STRING})
    company_id: string;

    @Column({type: DataType.STRING, defaultValue: "new"})
    status: string;

    @Column({type: DataType.BOOLEAN})
    is_active: boolean;
}
