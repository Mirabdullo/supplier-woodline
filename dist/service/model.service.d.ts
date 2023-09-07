import { Models } from "../model/model.model";
declare class ModelService {
    private Models;
    private UserModel;
    getModel(id: string): Promise<Models[]>;
}
export default ModelService;
