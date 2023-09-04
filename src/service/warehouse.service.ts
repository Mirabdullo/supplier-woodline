import { User } from "../model/user.model";
import { Warehouse } from "../model/warehouse.model";

class WarehouseService {
    public Warehouse: typeof Warehouse = Warehouse

    public async getWarehouse(id: string) {
        const user = await User.findByPk(id)


        return await this.Warehouse.findAll({
            where: { company_id: user.comp_id },
            attributes: ["id", "name", "company_id", "admin", "type"]
        })
    }

    


}


export default WarehouseService