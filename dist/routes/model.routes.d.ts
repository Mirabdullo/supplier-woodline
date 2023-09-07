import { Router } from "express";
declare class ModelRoutes {
    path: string;
    router: Router;
    private modelController;
    constructor();
    initializeRoutes(): void;
}
export default ModelRoutes;
