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
        this.router.get(`${this.path}-by-status`, this.productController.GET_BY_STATUS)
        this.router.put(`${this.path}-transfer/:id`, this.productController.TRANSFER)
        this.router.post(`${this.path}`, this.productController.POST)
    }
}

export default ProductRoutes
