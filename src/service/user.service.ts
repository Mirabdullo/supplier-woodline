import { AuthLoginDto } from "../dto/auth.dto";
import { createUserDto, loginUserDto } from "../dto/user.dto";
import { HttpExeption } from "../httpExeption/httpExeption";
import { IUser } from "../interface/user.interface";
import { Company } from "../model/company.model";
import { User } from "../model/user.model";
import { signJWT } from "./jwt.service";

class UserService {
    public UserModel: typeof User = User;
    public CompanyModel: typeof Company = Company;

    public async getUsers() {
        return await this.UserModel.findAll()
    }

    public async create(data: createUserDto) {
        const condidate: IUser | null = await this.UserModel.findOne({ where: { phone: data.phone } })
        if (condidate) {
            throw new HttpExeption(400, "This phone number already registireted")
        }

        const company = await this.CompanyModel.findOne({ where: { id: data.comp_id } })
        if (!company) throw new HttpExeption(400, "Company not found")
        
        const user = await this.UserModel.create(data)

        return user
    }

    public async login(userData: loginUserDto) {
        const { phone, password } = userData;

        const user = await this.UserModel.findOne({ where: { phone, password } });
        if (!user) {
            throw new HttpExeption(404, "User not found");
        }
        const token = await signJWT({ id: user.id, role: user.role });

        return {
            token,
            company_id: user.company_id,
            role: user.role,
            name: user?.name,
        };
    }

    
}

export default UserService