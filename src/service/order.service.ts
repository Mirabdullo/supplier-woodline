import { HttpExeption } from "../httpExeption/httpExeption";
import { Order } from "../model/order.model";
import { Product } from "../model/product.model";
import { User } from "../model/user.model";
import { Warehouse } from "../model/warehouse.model";


function makeSixDigit(number) {
    const strNumber = number.toString();
    if (strNumber.length < 6) {
        return strNumber.padStart(6, "0");
    }
    return strNumber;
}

function getRandomNumberFromArray(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function generateId(idArray: { order_id: string }[]): string {
    const digits: number = 5;
    const maxAttempts: number = 100;
    let attempts: number = 0;
    let randomNumber: string = "0";

    const existingIds: string[] = idArray.map((e) => e.order_id);
    const availableStartDigits: number[] = [1, 3, 4, 5, 8];

    do {
        const randomStart: number = getRandomNumberFromArray(availableStartDigits);
        randomNumber = `${randomStart}${Math.floor(Math.random() * Math.pow(10, digits))}`;
        randomNumber = makeSixDigit(randomNumber);
        attempts++;
    } while (existingIds.includes(randomNumber.toString()) && attempts < maxAttempts);

    if (attempts === maxAttempts) {
        return "Error";
    }

    return randomNumber;
}


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

        if (product.status !== "NEW" && product.status !== "REJECTED") {
            throw new HttpExeption(403, "Product Already accepted")
        }

        await this.OrderModel.update({
            status: "ACCEPTED"
        }, { where: { id: id } })
        
        await this.ProductModel.create({
            order_id: id,
            warehouse_id: warehouse.id
        })
        
        return "Product accepted"
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

        
        return "Product rejected"
    }


    public async deliveredProduct(id: string) {
        const product = await this.OrderModel.findOne({where: {id: id}})
  
        if (!product) {
            throw new HttpExeption(404, "Product not found")
        }

        if (product.status !== "ACTIVE" && product.status !== "ACCEPTED") {
            throw new HttpExeption(403, "Product not active")
        }

        await this.OrderModel.update({
            status: "DELIVERED"
        }, {where: {id: id}})
        
        return "Product delivered"
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
            status: "ACTIVE"
        }, {where: {id: id}})
        
        return "Product activated"
    }

    public async changeStatus(id: string, status: string) {
        const product = await this.OrderModel.findOne({
            where: { id: id }
        })

        if (!product) {
            throw new HttpExeption(404, "Product not found")
        } 

        console.log(product.dataValues);
        console.log(status);
        if (status === "ACTIVE" && product.status === "CREATED") {
            await this.OrderModel.update({
                status: "ACTIVE"
            }, {where: {id: id}})
        } else if (status === "DELIVERED" && (product.status === "SOLD_AND_CHECKED" || product.status === "ACCEPTED" || product.status === "ACTIVE")) {
            await this.OrderModel.update({
                status: "DELIVERED"
            }, {where: {id: id}})
        } else if (status === "REJECTED" && product.status === "REJECTED") {
            throw new HttpExeption(403, "already rejected")
        } else if (status === "REJECTED" && product.status === "NEW") {
            await this.OrderModel.update({
                status: "REJECTED"
            }, { where: { id: id } })
        } else if (status === "ACCEPTED" && product.status === "ACCEPTED") {
            throw new HttpExeption(403, "already accepted")
        } else if (status === "ACCEPTED" && (product.status === "NEW" || product.status === "REJECTED" || product.status === "new")) {
            await this.OrderModel.update({
                status: "ACCEPTED"
            }, { where: { id: id } })
        } else if (status === "SOLD_AND_CHECKED" && product.status === "SOLD_AND_CHECKED") {
            throw new HttpExeption(403, "already SOLD_AND_CHECKED")
        } else if (status === "SOLD_AND_CHECKED") {
            if (product.cathegory === "заказ" && product.status === "ACCEPTED") { 
                await this.OrderModel.update({
                    status: "SOLD_AND_CHECKED",
                }, { where: { id: id } })
            } else if (product.cathegory === "продажa со склада" && product.status === "SOLD") {
                await this.OrderModel.update({
                    status: "SOLD_AND_CHECKED",
                }, { where: { id: id } })
            } else {
                throw new HttpExeption(400, "Product status must be ACCEPTED OR SOLD")
            }
        } else {
            throw new HttpExeption(403, "Invalid status")
        }

        return await this.OrderModel.findByPk(id)

    }


    public async checkId(id: string) {
        return await this.OrderModel.findOne({ where: { order_id: id } })
    }

    public async getId() {
        const orders = await this.OrderModel.findAll({attributes: ["order_id"], order: [["createdAt", "DESC"]]})
        return generateId(orders)
    }


}

export default OrderService;