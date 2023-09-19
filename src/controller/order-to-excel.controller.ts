import { NextFunction, Request, Response } from "express";
import { ExcelService } from "../service/order-to-excel.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";

export class ExcelController {
    private excelService = new ExcelService();


    public TO_EXCEL = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const user = verifyJWT(token)
            console.log(user);

            const endDate: any = req.query.endDate
            const startDate: any = req.query.startDate

            const buffer = await this.excelService.ordersToExcel("f694b665-c92c-4d37-a43a-d123b90039d2", startDate, endDate)

            res.setHeader("Content-Disposition", 'attachment; filename="products.xlsx"');
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.write(buffer);
            res.end();
        } catch (error) {
            console.log(error);
            next(new HttpExeption(error.status, error.message))
        }
    }
}