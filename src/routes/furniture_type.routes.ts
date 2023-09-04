import { Router } from "express"
import FurnitureTypeController from "../controller/furniture_type.controller"
import { middleware } from "../middleware/auth.middleware"


class FurnitureTypeRoutes {
    public path: string = "/furniture-type"
    public router: Router = Router()
    private furnitureTypeController = new FurnitureTypeController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`,middleware, this.furnitureTypeController.GET)
    }
}

export default FurnitureTypeRoutes
