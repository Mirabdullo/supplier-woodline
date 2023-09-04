import { Router } from "express"
import WarehouseController from "../controller/warehouse.controller"
import { middleware } from "../middleware/auth.middleware"

class WarehouseRoutes {
    public path: string = "/warehouse"
    public router: Router = Router()
    public warehouseController = new WarehouseController()


    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`, middleware, this.warehouseController.GET)
    }
}

export default WarehouseRoutes