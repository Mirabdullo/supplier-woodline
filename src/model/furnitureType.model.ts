import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IFurnitureType } from "../interface/furnitureType.interface";

@Table({ timestamps: true, tableName: "furniture_type" })
export class FurnitureType extends Model<FurnitureType> implements IFurnitureType {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;
    
}
