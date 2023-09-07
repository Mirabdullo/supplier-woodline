import { Order } from "../model/order.model";
import { Product } from "../model/product.model";
import { createOrderDto } from "../dto/order.dto";
declare class ProductService {
    private ProductModel;
    private Warehouse;
    private User;
    private Models;
    private Order;
    getNewProduct(id: string, page: number, limit: number): Promise<Order[]>;
    getProduct(id: string, status: string, page: number, limit: number): Promise<{
        rows: Product[];
        count: number;
    }>;
    search(id: string, page: number, limit: number, search?: string, filter?: string, startDate?: Date, endDate?: Date): Promise<{
        totalAmount: number;
        products: Order[];
    }>;
    transferProduct(id: string, warehouseId: string): Promise<string>;
    postProduct(id: string, data: createOrderDto): Promise<Product>;
}
export default ProductService;
