import { NextFunction, Request, Response } from "express";
import WarehouseService from "../service/warehouse.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { RequestWithUser } from "../interface/request.interface";

class WarehouseController {
    public warehouseService = new WarehouseService()

    public GET = async (req: RequestWithUser, res: Response, next: NextFunction) => { 
        try {
            const userId = req.user.id

            res.json(await this.warehouseService.getWarehouse(userId))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    }
}

export default WarehouseController