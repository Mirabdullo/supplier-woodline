import { Column, DataType, Model, Table } from "sequelize-typescript";
import { IUser } from "../interface/user.interface";

@Table({ timestamps: true, tableName: "sellers" })
export class User extends Model<User> implements IUser {
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
    password: string;

    @Column({type: DataType.STRING})
    company_id: string;

    @Column({type: DataType.STRING})
    role: string;

    @Column({type: DataType.UUID})
    comp_id?: string;

    @Column({type: DataType.BOOLEAN})
    is_active: boolean;
}
