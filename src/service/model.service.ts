import { FurnitureType } from "../model/furnitureType.model";
import { Models } from "../model/model.model";

class ModelService {
    private Models: typeof Models = Models


    public async getModel() {
        return await this.Models.findAll({
            include: {
                model: FurnitureType
            }
        })
    }
}

export default ModelService