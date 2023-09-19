import { NextFunction, Request, Response } from "express";
import FurnitureTypeService from "../service/furniture_type.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { RequestWithUser } from "../interface/request.interface";

class FurnitureTypeController {
    private furnitureService = new FurnitureTypeService()


    public GET = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id

            res.json(await this.furnitureService.getType(userId))
        } catch (error) {
            console.log(error)
            next(new HttpExeption(error.status, error.message))
        }
    }
}

export default FurnitureTypeController