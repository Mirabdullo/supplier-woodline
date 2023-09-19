import { NextFunction, Request, Response } from "express";
import ModelService from "../service/model.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { RequestWithUser } from "../interface/request.interface";

class ModelController {
    private modelService = new ModelService();


    public GET = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id

            res.json(await this.modelService.getModel(userId))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    }
}

export default ModelController