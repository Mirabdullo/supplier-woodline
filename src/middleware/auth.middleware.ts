import { NextFunction, Request, Response } from "express";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { User } from "../model/user.model";


const producer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return  next(new HttpExeption(401, "Token not found"))
        }
        const decode = verifyJWT(token.split(" ")[1])

        console.log(decode);
        if (!decode) {
            return next(new HttpExeption(401, "Invalid token"))
        }

        const user = await User.findOne({
            where: {id: decode.id, role: decode.role, is_active: true}
        })
        if (!user) {
            return next(new HttpExeption(401, "You are not allowed to access"))
        }

        if (decode.role !== "PRODUCER") {
            return next(new HttpExeption(401, "You are not authorized to access this"))
        }
        next()
    } catch (error) {
        console.log(error);
        next(new HttpExeption(error.status, error.message))
    }
}


const storekeeper = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return  next(new HttpExeption(401, "Token not found"))
        }
        const decode = verifyJWT(token.split(" ")[1])

        console.log(decode);

        if (!decode) {
            return next(new HttpExeption(401, "Invalid token"))
        }

        const user = await User.findOne({
            where: {id: decode.id, role: decode.role, is_active: true}
        })
        if (!user) {
            return next(new HttpExeption(401, "You are not allowed to access"))
        }

        if (decode.role !== "STOREKEEPER") { 
            return next(new HttpExeption(401, "You are not allowed to access"))
        }
    } catch (error) {
        console.log(error);
        next(new HttpExeption(error.status, error.message))
    }
}




const middleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return  next(new HttpExeption(401, "Token not found"))
        }
        const decode = verifyJWT(token.split(" ")[1])

        console.log(decode);

        if (!decode) {
            return next(new HttpExeption(401, "Invalid token"))
        }

        const user = await User.findOne({
            where: {id: decode.id, role: decode.role, is_active: true}
        })
        if (!user) {
            return next(new HttpExeption(401, "You are not allowed to access"))
        }

        let roles = ["STOREKEEPER", "PRODUCER"]

        if (!roles.includes(decode.role)) { 
            return next(new HttpExeption(401, "You are not allowed to access"))
        }
    } catch (error) {
        console.log(error);
        next(new HttpExeption(error.status, error.message))
    }
}

export {producer, storekeeper, middleware}