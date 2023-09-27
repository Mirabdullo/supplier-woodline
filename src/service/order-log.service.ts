import { Order } from "../model/order.model";
import { OrderLog } from "../model/orderLog.model";
import { User } from "../model/user.model";

export async function logOrderChanged(orderId: string, userId: string): Promise<void> {
    try {
        const [order, user] = await Promise.all([
            Order.findByPk(orderId),
            User.findByPk(userId)
        ])

        if (!order || !user) {
            throw new Error(`${order ? "" : `Order ${orderId} not found`} ${user ? "" : `User ${orderId} not found`}`);
        }

        await OrderLog.create({
            order_id: order?.id,
            status: order?.status,
            cathegory: order?.cathegory,
            tissue: order?.tissue,
            title: order?.title,
            cost: order?.cost,
            sale: order?.sale,
            qty: order?.qty,
            sum: order?.sum,
            is_first: order?.is_first,
            copied: order?.copied,
            is_active: order?.is_active,
            end_date: order?.end_date,
            seller_id: userId,
        })

        console.log("Order log created");
    } catch (error) {
        console.log(error);
    }
}