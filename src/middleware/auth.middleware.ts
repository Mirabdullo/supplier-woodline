import { NextFunction, Request, Response } from "express";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";


const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decode = verifyJWT(token)

        console.log(decode);
        if (!decode) {
            next(new HttpExeption(401, "Invalid token"))

        }
        if (decode.role !== "ADMIN") {
            next(new HttpExeption(401, "You are not authorized to access this"))
        }
        next()
    } catch (error) {
        console.log(error);
        next(new HttpExeption(error.status, error.message))
    }
}

export default auth