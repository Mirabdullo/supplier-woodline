import { HttpExeption } from "../httpExeption/httpExeption";
import { Request, Response, NextFunction } from "express";
declare const errorMiddleware: (error: HttpExeption, req: Request, res: Response, next: NextFunction) => void;
export default errorMiddleware;
