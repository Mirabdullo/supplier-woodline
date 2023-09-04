import { FurnitureType } from "../model/furnitureType.model";
import { Models } from "../model/model.model";
import { User } from "../model/user.model";

class FurnitureTypeService {
    private TypeModel: typeof FurnitureType = FurnitureType
    private UserModel: typeof User = User


    public async getType(id: string) {
        const user = await this.UserModel.findByPk(id)

        return await this.TypeModel.findAll({
            attributes:["id", "name"],
            include: {
                model: Models,
                attributes: ["id", "name", "price", "sale","code"],
                where: {company_id: user.comp_id}
            }
        })
    }
}

export default FurnitureTypeService