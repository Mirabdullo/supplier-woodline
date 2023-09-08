import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class createOrderDto {
    @IsString()
    @IsNotEmpty()
    order_id: string;
    
    @IsUUID()
    model_id: string;
    
    @IsString()
    @IsNotEmpty()
    tissue: string;

    @IsString()
    @IsNotEmpty()
    title: string;


    @IsNumber()
    qty: number;

}
