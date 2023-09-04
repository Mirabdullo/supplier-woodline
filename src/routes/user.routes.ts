import { Router } from "express"
import UserController from "../controller/user.controller"
import { middleware, producer } from "../middleware/auth.middleware"

class UserRouter {
    public path: string = "/user"
    public router: Router = Router()
    public userController = new UserController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`, producer, this.userController.GET)
        this.router.post(`${this.path}/login`, this.userController.LOGIN)
    }
}

export default UserRouter