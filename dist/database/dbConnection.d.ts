import { Sequelize } from "sequelize-typescript";
export declare class Database {
    sequelize: Sequelize | undefined;
    constructor();
    private ConnectToDatabase;
}
