import express from "express";
import { Routes } from ".//interface/router.interface";
import { Database } from "./database/dbConnection";
declare class App {
    app: express.Application;
    port: number;
    db: Database;
    constructor(routes: Routes[]);
    listen(): void;
    connectionToDatabase(): Promise<void>;
    private initializeMiddleware;
    private initializeRoutes;
    private initializeSwagger;
    private initializeErrorHandler;
}
export default App;
