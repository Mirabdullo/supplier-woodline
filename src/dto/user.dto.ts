import { IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class createUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsPhoneNumber("UZ")
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    company_id: string;

    @IsString()
    @IsNotEmpty()
    role: string;

    @IsUUID()
    comp_id: string

    @IsOptional()
    @IsBoolean()
    is_active: boolean;
}


export class loginUserDto { 
    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
