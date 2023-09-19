import { NextFunction, Request, Response } from "express";
import ProductService from "../service/produc.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { createOrderDto } from "../dto/order.dto";

class ProductController {
    private productService = new ProductService();

    public GET_BY_STATUS = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)

            const status: string | any = req.query.status

            const page: number = +req.query.page || 1;
            const limit: number = +req.query.limit || 10


            res.json(await this.productService.getProduct(user.id, status, page, limit))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    public ALL = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)

            const search: any = req.query.search
            const status: any = req.query.status
            const name: any = req.query.name
            const type: any = req.query.type

            const page: number = +req.query.page || 1;
            const limit: number = +req.query.limit || 10;

            const startDate: Date | any = req.query.startDate
            const endDate: Date | any = req.query.endDate

            const orderBy: string | any = req.query.orderBy

            res.json(await this.productService.search(user.id, page, limit, search, status, name, type, startDate, endDate, orderBy));
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    public TRANSFER = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: string = req.params.id
            const warehouse: string = req.body.warehouse_id

            res.json(await this.productService.transferProduct(id, warehouse))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    public POST = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)
            

            const data: createOrderDto = req.body

            res.json(await this.productService.postProduct(user.id, data))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }
}

export default ProductController
