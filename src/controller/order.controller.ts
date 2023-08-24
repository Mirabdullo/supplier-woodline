import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order.service";
import { HttpExeption } from "../httpExeption/httpExeption";

class OrderController {
    public orderService = new OrderService()


    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.orderService.getOrder())
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    public ACCEPT_OR_REJECT = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id
            const status: string | any = req.query.status

            if (!id || !status) { 
                return res.status(404).json("Id or status not found")
            }
            let arr = ["ACCEPTED", "REJECTED"]
            if (!arr.includes(status)) {
                return res.status(403).json("Invalid status")
            }
            res.json(await this.orderService.acceptProduct(id, status))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    
}

export default OrderController