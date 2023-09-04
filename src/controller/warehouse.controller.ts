import { NextFunction, Request, Response } from "express";
import WarehouseService from "../service/warehouse.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";

class WarehouseController {
    public warehouseService = new WarehouseService()

    public GET = async (req: Request, res: Response, next: NextFunction) => { 
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)

            res.json(await this.warehouseService.getWarehouse(user.id))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    }
}

export default WarehouseController