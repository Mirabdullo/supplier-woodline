import { User } from "../model/user.model";

class UserService {
    public UserModel: typeof User = User;

    public async getUsers() {
        return await this.UserModel.findAll()
    }
}

export default UserService