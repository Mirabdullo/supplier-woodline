import { Warehouse } from "../model/warehouse.model";

class WarehouseService {
    public Warehouse: typeof Warehouse = Warehouse

    public async getWarehouse() {
        return await this.Warehouse.findAll()
    }

}


export default WarehouseService