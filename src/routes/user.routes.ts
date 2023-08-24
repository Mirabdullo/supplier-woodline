import { Router } from "express"
import UserController from "../controller/user.controller"

class UserRouter {
    public path: string = "/user"
    public router: Router = Router()
    public userController = new UserController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() { 
        this.router.get(`${this.path}`, this.userController.GET)
        this.router.post(`${this.path}/login`, this.userController.LOGIN)
    }
}

export default UserRouter