import jwt from "jsonwebtoken";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "JUDAYAM_MAXFIY_BO`LSA_EDI";

export function signJWT(payload: any) {
    const token = jwt.sign(payload, PRIVATE_KEY);

    return token;
}

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY);
        return decoded;
    } catch (err) {
        console.log(err.message);
        return null;
    }
}


