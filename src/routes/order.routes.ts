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
        this.router.get(`${this.path}/:id`, middleware, this.orderController.ORDER_BY_STATUS)
        this.router.put(`${this.path}/accepted/:id`, producer, this.orderController.ACCEPT)
        this.router.put(`${this.path}/rejected/:id`, producer, this.orderController.REJECT)
        this.router.put(`${this.path}/delivered/:id`, producer, this.orderController.DELIVERED)
        this.router.put(`${this.path}/activated/:id`, middleware, this.orderController.ACTIVE)
    }
}

export default OrderRoutes
