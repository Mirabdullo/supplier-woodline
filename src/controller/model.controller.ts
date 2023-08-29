import { NextFunction, Request, Response } from "express";
import ModelService from "../service/model.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";

class ModelController {
    private modelService = new ModelService();


    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const decode = verifyJWT(token)

            res.json(await this.modelService.getModel(decode.id))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    }
}

export default ModelController