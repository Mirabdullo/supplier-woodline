import { createUserDto, loginUserDto } from "../dto/user.dto";
import { Company } from "../model/company.model";
import { User } from "../model/user.model";
declare class UserService {
    UserModel: typeof User;
    CompanyModel: typeof Company;
    getUsers(): Promise<User[]>;
    create(data: createUserDto): Promise<User>;
    login(userData: loginUserDto): Promise<{
        token: any;
        company_id: string;
        role: string;
        name: string;
    }>;
}
export default UserService;
