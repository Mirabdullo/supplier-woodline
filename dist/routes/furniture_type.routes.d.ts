import { Router } from "express";
declare class FurnitureTypeRoutes {
    path: string;
    router: Router;
    private furnitureTypeController;
    constructor();
    initializeRoutes(): void;
}
export default FurnitureTypeRoutes;
