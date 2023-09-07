import { Warehouse } from "../model/warehouse.model";

class WarehouseService {
    public Warehouse: typeof Warehouse = Warehouse

    public async getWarehouse(id: string) {
        return await this.Warehouse.findAll({
            where: { type: "витрина" },
            attributes: ["id", "name", "company_id", "admin", "type"]
        })
    }

    


}


export default WarehouseService