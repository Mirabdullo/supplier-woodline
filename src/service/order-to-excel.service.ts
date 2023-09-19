import { Op } from "sequelize";
import { Order } from "../model/order.model";
import { User } from "../model/user.model";
import { Models } from "../model/model.model";
import { FurnitureType } from "../model/furnitureType.model";
import { Deals } from "../model/deal.model";
import * as ExcelJs from "exceljs";

export class ExcelService {
    private Orders: typeof Order = Order;
    private User: typeof User = User;
    private Models: typeof Models = Models;
    private FurnitureType: typeof FurnitureType = FurnitureType;
    private Deals: typeof Deals = Deals;

    public async ordersToExcel(id: string, start?: string, end?: string) {
        const workbook = new ExcelJs.Workbook();
        const sheet = workbook.addWorksheet("");

        const user = await User.findByPk(id);
        let currentDate = new Date();
        const startDate = new Date(start || currentDate.setDate(currentDate.getMonth() - 1));
        const endDate = new Date(end || new Date().getTime());

        const orders = await this.Orders.findAll({
            where: {
                status: { [Op.in]: ["DELIVERED", "TRANSFERED"] },
                "$model.company_id$": user.comp_id,
                createdAt: { [Op.between]: [startDate, endDate] },
            },
            attributes: ["id", "order_id", "cathegory", "tissue", "title", "cost", "sale", "qty", "sum", "status", "createdAt"],
            include: [
                {
                    model: this.Models,
                    attributes: ["id", "name", "price", "sale", "code"],
                    include: [
                        {
                            model: this.FurnitureType,
                            attributes: ["id", "name"],
                        },
                    ],
                },
                {
                    model: this.Deals,
                    attributes: ["id", "delivery_date", "rest"],
                    include: [
                        {
                            model: this.User,
                            attributes: ["id", "name", "phone"],
                        },
                    ],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        sheet.columns = [
            { header: "№", key: "index", width: 6 },
            { header: "дата", key: "date", width: 12 },
            { header: "ид", key: "order_id", width: 12 },
            { header: "категория", key: "cathegory", width: 19 },
            { header: "вид мебели", key: "furniture_type", width: 22 },
            { header: "модель", key: "model", width: 22 },
            { header: "ткань", key: "tissue", width: 22 },
            { header: "примечание", key: "title", width: 32 },
            { header: "артикул", key: "artikul", width: 14 },
            { header: "дата отгрузки", key: "delivery_date", width: 17 },
            { header: "кол-во", key: "qty", width: 10 },
            { header: "продавец", key: "seller", width: 16 },
        ];



        sheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, cellNumber) => {
                if (rowNumber === 1) {
                    row.height = 27;
                    cell.font = { bold: true, color: { argb: "#00000" }, size: 14 };
                    cell.fill = {
                        type: "pattern",
                        pattern: "solid",
                        bgColor: { argb: "#34ea00" },
                    };
                    cell.alignment = { horizontal: "center", vertical: "middle" };
                    cell.font.color = { argb: "#FFFFFF" };

                } else {
                    row.height = 20;
                    cell.alignment = { wrapText: true, vertical: "middle", horizontal: "center" };
                }
            });
        });

        sheet.views = [
            {
                state: "frozen",
                ySplit: 1,
            },
        ];

        const dataRowsStart = 2; // Assuming your data starts from the second row
        orders.forEach((product, index) => {
            const rowIndex = dataRowsStart + index;
            sheet.addRow({
                index: index + 1,
                date: product.createdAt,
                order_id: product.order_id,
                cathegory: product.cathegory,
                furniture_type: product?.model?.type.name,
                model: product?.model?.name,
                tissue: product?.tissue,
                title: product?.title,
                artikul: product.model.code,
                delivery_date: product?.deal?.delivery_date,
                qty: product?.qty,
                seller: product?.deal?.seller.name || "  ",
            });

            const row = sheet.getRow(rowIndex);
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: "thin" },
                    left: { style: "thin" },
                    bottom: { style: "thin" },
                    right: { style: "thin" },
                };
            });
        });

        sheet.getColumn("index").alignment = { vertical: "middle", horizontal: "left" };
        sheet.getColumn("date").alignment = { vertical: "middle", horizontal: "center" };
        sheet.getColumn("artikul").alignment = { vertical: "middle", horizontal: "center" };
        sheet.getColumn("title").alignment = { wrapText: true, vertical: "middle", horizontal: "left" };

        const buffer = await workbook.xlsx.writeBuffer();

        return buffer;
    }
}
