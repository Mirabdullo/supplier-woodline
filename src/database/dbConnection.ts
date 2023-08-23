import { dbConnection } from "./../config/dbconfig";
import { Sequelize } from "sequelize-typescript";
require("dotenv").config({ path: `.${process.env.NODE_ENV}.env`, isGlobal: true });

export class Database {
    public sequelize: Sequelize | undefined;

    constructor() {
        this.ConnectToDatabase();
    }

    private async ConnectToDatabase() {
        try {
            this.sequelize = new Sequelize(dbConnection);
            await this.sequelize.authenticate();
            console.log("Connection has been astablished successfully");
        } catch (error) {
            console.log("\nUnable to connect to the database:\n\n", error);
        }
    }
}