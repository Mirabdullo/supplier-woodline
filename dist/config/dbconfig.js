"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const path_1 = __importDefault(require("path"));
const fs = __importStar(require("fs"));
const user_model_1 = require("../model/user.model");
const company_model_1 = require("../model/company.model");
const product_model_1 = require("../model/product.model");
const warehouse_model_1 = require("../model/warehouse.model");
const order_model_1 = require("../model/order.model");
const model_model_1 = require("../model/model.model");
const furnitureType_model_1 = require("../model/furnitureType.model");
const deal_model_1 = require("../model/deal.model");
const file = path_1.default.join(__dirname, "../../ca-certificate.crt");
const serverCa = [fs.readFileSync(file, 'utf8')];
exports.dbConnection = {
    host: "db-postgresql-fra1-95213-do-user-12466147-0.b.db.ondigitalocean.com",
    username: "doadmin",
    database: "woodlinecrm",
    port: 25060,
    password: "AVNS_Hq7s9CF7p0HNn1ikIoZ",
    dialect: "postgres",
    models: [user_model_1.User, company_model_1.Company, product_model_1.Product, warehouse_model_1.Warehouse, order_model_1.Order, model_model_1.Models, furnitureType_model_1.FurnitureType, deal_model_1.Deals],
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            ca: serverCa,
        },
    },
};
// import { SequelizeOptions } from "sequelize-typescript";
// require("dotenv").config({ path: `.${process.env.NODE_ENV}.env` });
// export const Config: SequelizeOptions = {
//     dialect: "postgres",
//     port: 5432,
//     host: process.env.HOST,
//     username: "postgres" || process.env.USERNAME,
//     password: process.env.PASSWORD,
//     database: process.env.DB,
//     pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
//     models: [],
//     logging: false,
//     sync: { force: true },
// };
//# sourceMappingURL=dbconfig.js.map