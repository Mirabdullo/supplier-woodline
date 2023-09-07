import { NextFunction, Request, Response } from "express";
import WarehouseService from "../service/warehouse.service";
declare class WarehouseController {
    warehouseService: WarehouseService;
    GET: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default WarehouseController;
