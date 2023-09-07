"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const dbconfig_1 = require("./../config/dbconfig");
const sequelize_typescript_1 = require("sequelize-typescript");
require("dotenv").config({ path: `.${process.env.NODE_ENV}.env`, isGlobal: true });
class Database {
    constructor() {
        this.ConnectToDatabase();
    }
    async ConnectToDatabase() {
        try {
            this.sequelize = new sequelize_typescript_1.Sequelize(dbconfig_1.dbConnection);
            await this.sequelize.authenticate();
            this.sequelize.sync();
            console.log("Connection has been astablished successfully");
        }
        catch (error) {
            console.log("\nUnable to connect to the database:\n\n", error);
        }
    }
}
exports.Database = Database;
//# sourceMappingURL=dbConnection.js.map