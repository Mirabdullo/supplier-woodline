import { NextFunction, Request, Response } from "express";
import ModelService from "../service/model.service";
import { HttpExeption } from "../httpExeption/httpExeption";

class ModelController {
    private modelService = new ModelService();


    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.modelService.getModel())
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    }
}

export default ModelController