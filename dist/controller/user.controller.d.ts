import { NextFunction, Request, Response } from "express";
import UserService from "../service/user.service";
declare class UserController {
    UserService: UserService;
    GET: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    POST: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    LOGIN: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
export default UserController;
