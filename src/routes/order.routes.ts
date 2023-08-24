import { Router } from "express"
import OrderController from "../controller/order.controller"


class OrderRoutes {
    public path: string = "/order"
    public router: Router = Router()
    private orderController = new OrderController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`, this.orderController.GET)
        this.router.put(`${this.path}/check`, this.orderController.ACCEPT_OR_REJECT)
    }
}

export default OrderRoutes
