import { HttpExeption } from "../httpExeption/httpExeption";
import { Order } from "../model/order.model";

class OrderService {
    public OrderModel: typeof Order = Order


    public async getOrder() {
        return await this.OrderModel.findAll()
    }


    public async acceptProduct(id: string, status: string) {
        const product = await this.OrderModel.findByPk(id)

        if (!product) {
            throw new HttpExeption(404, "Product not found")
        }

        await this.OrderModel.update({
            status: status
        }, {where: {id: id}})
        
        return "Product updated"
    }

    public 

}

export default OrderService;