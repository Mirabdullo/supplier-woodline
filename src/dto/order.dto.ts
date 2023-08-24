import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class createOrderDto {
    @IsString()
    @IsNotEmpty()
    order_id: string;

    @IsString()
    @IsNotEmpty()
    cathegory: string;

    @IsString()
    @IsNotEmpty()
    tissue: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsUUID()
    model_id: string;

    @IsNumber()
    cost: number;

    @IsNumber()
    sale: number;

    @IsNumber()
    qty: number;

    @IsNumber()
    sum: number;
}
