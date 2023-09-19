import { Router } from "express"
import OrderController from "../controller/order.controller"
import { middleware, producer } from "../middleware/auth.middleware"


class OrderRoutes {
    public path: string = "/order"
    public router: Router = Router()
    private orderController = new OrderController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`, middleware, this.orderController.GET)
        this.router.get(`${this.path}/get-id`, middleware, this.orderController.GET_ID)
        this.router.get(`${this.path}/:id`, middleware, this.orderController.CHECK_ID)
        this.router.put(`${this.path}/:id`, middleware, this.orderController.CHANGE_STATUS)
    }
}

export default OrderRoutes
