export interface IOrder {
    id: string;
    order_id: string;
    cathegory: string;
    tissue: string;
    title: string;
    cost: number;
    sale: number;
    qty: number;
    sum: number;
    is_first: boolean;
    copied: boolean;
    status: string;
    is_active: boolean;
    end_date?: Date;
    seller_id?: string;
}
