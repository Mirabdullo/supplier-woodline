import { Request } from "express";

export interface DecodedToken {
    id?: string;
    role?: string;
}

export interface RequestWithUser extends Request {
    user?: DecodedToken;
}