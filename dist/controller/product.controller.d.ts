import { NextFunction, Request, Response } from "express";
declare class ProductController {
    private productService;
    GET: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GET_BY_STATUS: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    ALL: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    TRANSFER: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    POST: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default ProductController;
