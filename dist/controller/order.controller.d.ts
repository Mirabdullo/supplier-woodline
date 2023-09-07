import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order.service";
declare class OrderController {
    orderService: OrderService;
    GET: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    ACCEPT: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    REJECT: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    ACTIVE: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    DELIVERED: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
    CHECK_ID: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    GET_ID: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default OrderController;
