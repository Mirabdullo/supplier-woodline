import { HttpExeption } from "../httpExeption/httpExeption";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";
import { User } from "../model/user.model";
import { Warehouse } from "../model/warehouse.model";
import ProductService from "./produc.service";

class OrderService {
    public OrderModel: typeof Order = Order
    private ProductModel: typeof Product = Product
    private UserModel: typeof User = User
    private WarehouseModel: typeof Warehouse = Warehouse

    public async getOrder() {
        return await this.OrderModel.findAll()
    }


    public async acceptProduct(userId: string, id: string) {
        const user = await this.UserModel.findByPk(userId)
        const warehouse = await this.WarehouseModel.findOne({where: {company_id: user.comp_id}})

        const product = await this.OrderModel.findOne({where: {id: id}})

        if (!product) {
            throw new HttpExeption(404, "Product not found")
        }

        if (product.status !== "NEW") {
            throw new HttpExeption(403, "Product Already accepted or rejected")
        }

        await this.OrderModel.update({
            status: "ACCEPTED"
        }, { where: { id: id } })
        
        await this.ProductModel.create({
            order_id: id,
            warehouse_id: warehouse.id
        })
        
        return "Product updated"
    }

    public async rejectProduct(id: string) {
        const product = await this.OrderModel.findOne({where: {id: id}})
  
        if (!product) {
            throw new HttpExeption(404, "Product not found")
        }

        if (product.status !== "NEW") {
            throw new HttpExeption(403, "Product Already accepted or rejected")
        }

        await this.OrderModel.update({
            status: "REJECTED"
        }, { where: { id: id } })

        
        return "Product updated"
    }


    public async deliveredProduct(id: string) {
        const product = await this.OrderModel.findOne({where: {id: id}})
  
        if (!product) {
            throw new HttpExeption(404, "Product not found")
        }

        if (product.status !== "ACTIVE") {
            throw new HttpExeption(403, "Product not active")
        }

        await this.OrderModel.update({
            status: "DELIVERED"
        }, {where: {id: id}})
        
        return "Product updated"
    }

    public async activateProduct(id: string) {
        const product = await this.OrderModel.findOne({where: {id: id}})
  
        if (!product) {
            throw new HttpExeption(404, "Product not found")
        } 

        if (product.status !== "ACCEPTED") {
            throw new HttpExeption(403, "Product not accepted")
        }

        await this.OrderModel.update({
            status: "REJECTED"
        }, {where: {id: id}})
        
        return "Product updated"
    }


    public async orderById(id: string) {
        const product = await this.OrderModel.findByPk(id)
        if (!product) {
            throw new HttpExeption(404, "Product not found")
        }

        return product
    }


}

export default OrderService;