import { NextFunction, Request, Response } from "express";
import { HttpExeption } from "../httpExeption/httpExeption";
import { decodeToken, verifyJWT } from "../service/jwt.service";
import { User } from "../model/user.model";
import { DecodedToken, RequestWithUser } from "../interface/request.interface";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        if (["/user/login"].includes(req.url)) {
            return next();
        }
        const authorization = req.headers.authorization;
        if (!authorization) {
            return next(new HttpExeption(401, "Authorization not provided"));
        }
    
        const token = authorization.split(" ")[1];
        if (!token) {
            return next(new HttpExeption(401, "Token not provided"));
        }
        const userData: any = await decodeToken(token);
        if (!userData.id) {
            return next(new HttpExeption(401, "No ID in User"));
        }

        req.user = userData;
        return next();
    } catch (error) {
        console.log(error?.message, "In auth");
        return next(new HttpExeption(401, error?.message || "Unathorized"));
    }
};



const producer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token) {
            return  next(new HttpExeption(401, "Token not found"))
        }

        const decode = verifyJWT(token.split(" ")[1])

        if (!decode) {
            return next(new HttpExeption(401, "Invalid token"))
        }

        const user = await User.findOne({
            where: {id: decode.id, role: decode.role, is_active: true}
        })
        if (!user) {
            return next(new HttpExeption(401, "You are not allowed to access"))
        }

        if (!decode.role || decode.role !== "PRODUCER") {
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


        if (!decode) {
            return next(new HttpExeption(401, "Invalid token"))
        }

        const user = await User.findOne({
            where: {id: decode.id, role: decode.role, is_active: true}
        })
        if (!user) {
            return next(new HttpExeption(401, "You are not allowed to access"))
        }

        if (!decode.role || decode.role !== "STOREKEEPER") { 
            return next(new HttpExeption(401, "You are not allowed to access"))
        }

        next()
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

        if (!decode.role || !roles.includes(decode.role)) { 
            return next(new HttpExeption(401, "You are not allowed to access"))
        }

        next()
    } catch (error) {
        console.log(error);
        next(new HttpExeption(error.status, error.message))
    }
}

export {producer, storekeeper, middleware}