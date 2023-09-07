import { Router } from "express";
declare class OrderRoutes {
    path: string;
    router: Router;
    private orderController;
    constructor();
    initializeRoutes(): void;
}
export default OrderRoutes;
