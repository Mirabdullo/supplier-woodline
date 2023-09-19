import { NextFunction, Request, Response } from "express";
import { ExcelService } from "../service/order-to-excel.service";
import { HttpExeption } from "../httpExeption/httpExeption";
import { verifyJWT } from "../service/jwt.service";
import { RequestWithUser } from "../interface/request.interface";

export class ExcelController {
    private excelService = new ExcelService();


    public TO_EXCEL = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.id

            const endDate: any = req.query.endDate
            const startDate: any = req.query.startDate

            const buffer = await this.excelService.ordersToExcel(userId, startDate, endDate)

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