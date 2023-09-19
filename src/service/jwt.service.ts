import jwt from "jsonwebtoken";
import { HttpExeption } from "../httpExeption/httpExeption";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "JUDAYAM_MAXFIY_BO`LSA_EDI";

// export async function decodeToken(token: string) /* : Promise<string | jwt.JwtPayload | DecodedToken> */ {
//     try {
//         const data = await jwt.verify(token, PRIVATE_KEY);
//         if (!data) {
//             throw new HttpExeption(404, "No information in token");
//         }

//         return data;
//     } catch (error) {
//         if (error.name === "TokenExpiredError") {
//             throw new HttpExeption(401, "Token has expired");
//         } else if (error.name === "JsonWebTokenError") {
//             throw new HttpExeption(401, "Invalid token");
//         } else {
//             throw new HttpExeption(401, "Token verification failed");
//         }
//     }
// }

export function signJWT(payload: any) {
    const token = jwt.sign(payload, PRIVATE_KEY);

    return token;
}

export function verifyJWT(token: string) {
    try {
        const decoded: any = jwt.verify(token, PRIVATE_KEY);

        return decoded;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}
