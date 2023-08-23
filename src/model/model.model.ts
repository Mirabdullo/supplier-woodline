import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IModel } from "../interface/model.interface";

@Table({ timestamps: true, tableName: "models" })
export class Models extends Model<Models> implements IModel {
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
    price: number;

    @Column({type: DataType.STRING})
    sale: number;

    @Column({type: DataType.STRING})
    code: string;

    @Column({type: DataType.STRING, allowNull: false, defaultValue: true})
    is_active: boolean;

    @Column({type: DataType.UUID})
    company_id?: string;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: "NEW"})
    status: string;
}
