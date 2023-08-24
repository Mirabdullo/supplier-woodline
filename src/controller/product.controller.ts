import { NextFunction, Request, Response } from "express";
import ProductService from "../service/produc.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";

class ProductController {
    private productService = new ProductService();

    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)
            res.json(await this.productService.getProduct(user.id))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }
}

export default ProductController
