import { NextFunction, Request, Response } from "express";
import WarehouseService from "../service/warehouse.service";
import { HttpExeption } from "../httpExeption/httpExeption";

class WarehouseController {
    public warehouseService = new WarehouseService()

    public GET = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            res.json(await this.warehouseService.getWarehouse())
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    }
}

export default WarehouseController