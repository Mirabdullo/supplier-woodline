import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";

class OrderController {
    public orderService = new OrderService();

    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)
            console.log(user);

            const endDate: any = req.query.endDate
            const startDate: any = req.query.startDate

            const page: number = +req.query.page || 1
            const limit: number = +req.query.limit || 10
            res.json(await this.orderService.getOrder(user.id, page, limit, endDate, startDate));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };

    public ACCEPT = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const user = verifyJWT(token);

            const id: string = req.params.id;

            if (!id) {
                return res.status(404).json("Id not found");
            }

            res.json(await this.orderService.acceptProduct(user.id, id));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };

    public REJECT = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            if (!id) {
                return res.status(404).json("Id not found");
            }

            res.json(await this.orderService.rejectProduct(id));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };

    public ACTIVE = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            if (!id) {
                return res.status(404).json("Id not found");
            }

            res.json(await this.orderService.activateProduct(id));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };

    public DELIVERED = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id;

            if (!id) {
                return res.status(404).json("Id not found");
            }

            res.json(await this.orderService.deliveredProduct(id));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    };

    public CHANGE_STATUS = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)
         
            const id: string = req.params.id;
            const status: string | any = req.query.status

            res.json(await this.orderService.changeStatus(id, status, user.id));
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
