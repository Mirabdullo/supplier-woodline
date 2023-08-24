import { Router } from "express"
import ProductController from "../controller/product.controller"


class ProductRoutes {
    public path: string = "/warehouse-product"
    public router: Router = Router()
    private productController = new ProductController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`, this.productController.GET)
    }
}

export default ProductRoutes
