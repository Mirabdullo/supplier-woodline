import { Warehouse } from "../model/warehouse.model";
declare class WarehouseService {
    Warehouse: typeof Warehouse;
    getWarehouse(id: string): Promise<Warehouse[]>;
}
export default WarehouseService;
