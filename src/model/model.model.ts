import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { IModel } from "../interface/model.interface";
import { Company } from "./company.model";
import { FurnitureType } from "./furnitureType.model";

@Table({ timestamps: true, tableName: "models" })
export class Models extends Model<Models> implements IModel {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.STRING })
    price: number;

    @Column({ type: DataType.STRING })
    sale: number;

    @Column({ type: DataType.STRING })
    code: string;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: true })
    is_active: boolean;

    @ForeignKey(() => Company)
    @Column({ type: DataType.UUID })
    company_id: string;
    @BelongsTo(() => Company)
    company: Company;

    @ForeignKey(() => FurnitureType)
    @Column({ type: DataType.UUID })
    type_id: string;
    @BelongsTo(() => FurnitureType)
    type: FurnitureType;

    @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: "NEW" })
    status: string;
}
