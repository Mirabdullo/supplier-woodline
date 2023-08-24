import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { IFurnitureType } from "../interface/furnitureType.interface";
import { Models } from "./model.model";

@Table({ timestamps: true, tableName: "furniture_types" })
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

    @HasMany(() => Models)
    models: Models[];
    
}
