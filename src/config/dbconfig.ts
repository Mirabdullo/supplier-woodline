import path from "path";
import * as fs from "fs";
import { SequelizeOptions } from "sequelize-typescript";
import { User } from "../model/user.model";
import { Company } from "../model/company.model";
import { Product } from "../model/product.model";
import { Warehouse } from "../model/warehouse.model";
import { Order } from "../model/order.model";
import { Models } from "../model/model.model";
import { FurnitureType } from "../model/furnitureType.model";
import { Deals } from "../model/deal.model";
import { Client } from "../model/client.model";
import dotenv from "dotenv";
import { OrderLog } from "../model/orderLog.model";
dotenv.config();

const file: string = path.join(__dirname, "../../ca-certificate.crt");
const serverCa = [fs.readFileSync(file, "utf8")];

const db: string = process.env.DB || "";
const username: string = process.env.ADMIN || "";
const password: string = process.env.PASSWORD || "";
const host: string = process.env.HOST || "";
const port: number = parseInt(process.env.PORT || "");

export const dbConnection: SequelizeOptions = {
    host: host,
    username: username,
    database: db,
    port: port,
    password: password,
    dialect: "postgres",
    models: [User, Company, Product, Warehouse, Order, Models, FurnitureType, Deals, Client, OrderLog],
    logging: false,
    dialectOptions: {
        ssl: { rejectUnauthorized: true, ca: serverCa },
    },
};


