import { AuthLoginDto } from "../dto/auth.dto";
import { HttpExeption } from "../httpExeption/httpExeption";
import { User } from "../model/user.model";
import { signJWT } from "./jwt.service";

class AuthService {
    public UserModel: typeof User = User;

 
}
