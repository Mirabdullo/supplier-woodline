import { NextFunction, Request, Response } from "express";
import FurnitureTypeService from "../service/furniture_type.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";

class FurnitureTypeController {
    private furnitureService = new FurnitureTypeService()


    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const decode = verifyJWT(token)

            res.json(await this.furnitureService.getType(decode.id))
        } catch (error) {
            console.log(error)
            next(new HttpExeption(error.status, error.message))
        }
    }
}

export default FurnitureTypeController