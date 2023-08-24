import { Router } from "express"
import ModelController from "../controller/model.controller"
import auth from "../middleware/auth.middleware"

class ModelRoutes {
    public path: string = "/models"
    public router: Router = Router()
    private modelController = new ModelController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`, auth, this.modelController.GET)
    }
}

export default ModelRoutes