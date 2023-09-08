import { FurnitureType } from "../model/furnitureType.model";
import { Models } from "../model/model.model";
import { User } from "../model/user.model";

class ModelService {
    private Models: typeof Models = Models
    private UserModel: typeof User = User

    public async getModel(id: string) {
        const user = await this.UserModel.findByPk(id)
        
        return await this.Models.findAll({
            where: { company_id: user.comp_id },
            attributes: ["id", "name", "code", "price", "sale"],
            include: {
                model: FurnitureType,
                attributes: ["id", "name"]
            }
        })
    }
}

export default ModelService