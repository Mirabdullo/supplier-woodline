import { Router } from "express";
declare class ProductRoutes {
    path: string;
    router: Router;
    private productController;
    constructor();
    initializeRoutes(): void;
}
export default ProductRoutes;
