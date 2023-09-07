export declare class HttpExeption extends Error {
    status: number;
    message: string;
    constructor(status: number, message: string);
}
