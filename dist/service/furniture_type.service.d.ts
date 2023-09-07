import { FurnitureType } from "../model/furnitureType.model";
declare class FurnitureTypeService {
    private TypeModel;
    private UserModel;
    getType(id: string): Promise<FurnitureType[]>;
}
export default FurnitureTypeService;
