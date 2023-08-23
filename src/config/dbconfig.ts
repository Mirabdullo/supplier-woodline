import path from 'path'
import * as fs from 'fs'
import { SequelizeOptions } from 'sequelize-typescript';
import { User } from '../model/user.model';
import { Company } from '../model/company.model';
import { Product } from '../model/product.model';

const file: string = path.join(__dirname, "../../ca-certificate.crt");
const serverCa = [fs.readFileSync(file, 'utf8')];

export const dbConnection: SequelizeOptions = {
    host: "db-postgresql-fra1-95213-do-user-12466147-0.b.db.ondigitalocean.com",
    username: "doadmin",
    database: "woodlinecrm",
    port: 25060,
    password: "AVNS_Hq7s9CF7p0HNn1ikIoZ",
    dialect: "postgres", // or 'mysql', 'sqlite', 'mssql', etc.
    models: [User, Company, Product, ],
    logging: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: true,
            ca: serverCa,
        },
    },
}



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