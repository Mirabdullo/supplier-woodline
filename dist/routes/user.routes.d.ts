import { Router } from "express";
import UserController from "../controller/user.controller";
declare class UserRouter {
    path: string;
    router: Router;
    userController: UserController;
    constructor();
    initializeRoutes(): void;
}
export default UserRouter;
