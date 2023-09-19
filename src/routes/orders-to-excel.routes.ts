import { Router } from "express"
import { ExcelController } from "../controller/order-to-excel.controller"
import { middleware } from "../middleware/auth.middleware"

export class ExcelRoutes {
    public path: string = "/excel"
    public router: Router = Router()
    private excelController = new ExcelController()

    constructor() {
        this.initializeRoutes()
    }

    public initializeRoutes() {
        this.router.get(`${this.path}`, middleware, this.excelController.TO_EXCEL)
    }   


}