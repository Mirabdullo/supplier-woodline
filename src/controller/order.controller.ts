import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { RequestWithUser } from "../interface/request.interface";

class OrderController {
    public orderService = new OrderService();

    public GET = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id

            const endDate: any = req.query.endDate
            const startDate: any = req.query.startDate

            const page: number = +req.query.page || 1
            const limit: number = +req.query.limit || 10
            res.json(await this.orderService.getOrder(userId, page, limit, endDate, startDate));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };

    public CHANGE_STATUS = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id
         
            const id: string = req.params.id;
            const status: string | any = req.query.status

            res.json(await this.orderService.changeStatus(id, status, userId));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    public CHECK_ID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            res.json(await this.orderService.checkId(id));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };

    public GET_ID = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.orderService.getId());
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };
}

export default OrderController;
