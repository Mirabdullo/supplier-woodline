import { NextFunction, Request, Response } from "express";
declare const producer: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const storekeeper: (req: Request, res: Response, next: NextFunction) => Promise<void>;
declare const middleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { producer, storekeeper, middleware };
