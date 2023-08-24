import { IsBoolean, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class createProductDto {
    @IsString()
    @IsNotEmpty()
    order_id: string;

    @IsUUID()
    warehouse_id: string;

    @IsBoolean()
    is_active: boolean;

    @IsBoolean()
    is_copied: boolean;
}