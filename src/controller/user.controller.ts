import { NextFunction, Request, Response } from "express";
import UserService from "../service/user.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { createUserDto, loginUserDto } from "../dto/user.dto";

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

    public POST = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: createUserDto = req.body

            res.json(await this.UserService.create(data))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }

    public LOGIN = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data: loginUserDto = req.body

            res.json(await this.UserService.login(data))
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }
}

export default UserController