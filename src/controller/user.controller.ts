import { NextFunction, Request, Response } from "express";
import UserService from "../service/user.service";
import { HttpExeption } from "../httpExeption/httpExeption";

class UserController {
    public UserService = new UserService()

    public GET = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.json(await this.UserService.getUsers())
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message));
        }
    }
}

export default UserController