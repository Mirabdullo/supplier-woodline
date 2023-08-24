import { NextFunction, Request, Response } from "express";
import ProductService from "../service/produc.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { createOrderDto } from "../dto/order.dto";

class ProductController {
    private productService = new ProductService();

    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)
            res.json(await this.productService.getNewProduct(user.id))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    public GET_BY_STATUS = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)

            const status: string | any = req.query.status

            res.json(await this.productService.getProduct(user.id, status))
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
