import { Router } from "express";
import WarehouseController from "../controller/warehouse.controller";
declare class WarehouseRoutes {
    path: string;
    router: Router;
    warehouseController: WarehouseController;
    constructor();
    initializeRoutes(): void;
}
export default WarehouseRoutes;
