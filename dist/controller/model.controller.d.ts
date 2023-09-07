import { NextFunction, Request, Response } from "express";
declare class ModelController {
    private modelService;
    GET: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default ModelController;
