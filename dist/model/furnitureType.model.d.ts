import { Model } from "sequelize-typescript";
import { IFurnitureType } from "../interface/furnitureType.interface";
import { Models } from "./model.model";
export declare class FurnitureType extends Model<FurnitureType> implements IFurnitureType {
    id: string;
    name: string;
    models: Models[];
}
