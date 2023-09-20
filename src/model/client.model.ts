import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IClient } from "../interface/clinet.interface";

@Table({ timestamps: true, tableName: "clients" })
export class Client extends Model<Client> implements IClient {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING})
    phone: string;

    @Column({type: DataType.STRING})
    where_from: string;

    @Column({type: DataType.STRING})
    status: string;

    @Column({type: DataType.BOOLEAN})
    is_active: boolean;
}
