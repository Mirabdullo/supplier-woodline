import { Order } from "../model/order.model";
declare class OrderService {
    OrderModel: typeof Order;
    private ProductModel;
    private UserModel;
    private WarehouseModel;
    getOrder(): Promise<Order[]>;
    acceptProduct(userId: string, id: string): Promise<string>;
    rejectProduct(id: string): Promise<string>;
    deliveredProduct(id: string): Promise<string>;
    activateProduct(id: string): Promise<string>;
    checkId(id: string): Promise<Order>;
    getId(): Promise<string>;
}
export default OrderService;
