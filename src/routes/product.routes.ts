import { Router } from "express"
import ProductController from "../controller/product.controller"
import { middleware, producer } from "../middleware/auth.middleware"


class ProductRoutes {
    public path: string = "/warehouse-product"
    public router: Router = Router()
    private productController = new ProductController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        // this.router.get(`${this.path}`, producer, this.productController.GET)
        this.router.get(`${this.path}`, producer, this.productController.ALL)
        this.router.get(`${this.path}/by-status`,middleware, this.productController.GET_BY_STATUS)
        this.router.put(`${this.path}/transfer/:id`, producer, this.productController.TRANSFER)
        this.router.post(`${this.path}`, producer, this.productController.POST)
    }
}

export default ProductRoutes
