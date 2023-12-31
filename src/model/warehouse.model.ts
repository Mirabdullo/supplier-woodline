import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IWarehouse } from "../interface/warehouse.interface";
import { Company } from "./company.model";
import { Product } from "./product.model";
import { User } from "./user.model";

@Table({ timestamps: true, tableName: "warehouse", paranoid: true })
export class Warehouse extends Model<Warehouse> implements IWarehouse {
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        defaultValue: DataType.UUIDV4,
        allowNull: false,
    })
    id: string;

    @Column({ type: DataType.STRING})
    name: string;

    @ForeignKey(() => Company)
    @Column({ type: DataType.UUID, allowNull: false })
    company_id: string;
    @BelongsTo(() => Company)
    company: Company;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, allowNull: false })
    admin: string;
    @BelongsTo(() => User)
    user: User;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: "NEW" })
    status: string;

    @Column({ type: DataType.STRING, allowNull: false, defaultValue: "склад" })
    type: string;

    @Column({ type: DataType.DATE, defaultValue: null })
    deletedAt: string;

    @HasMany(() => Product)
    products: Product[];
}
