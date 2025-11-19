export interface CustomerHistory {
    orders: Order[];
    total_orders: number;
    total_value: number;
    brands: Brand[];
    devices: Device[];
}

export interface Brand {
    brand: string;
    total_quantity: string;
    total_value: string;
    quantity_percentage: string;
    value_percentage: string;
}

export interface Device {
    produto_chave: number;
    total_quantity: string;
    total_value: string;
    device: string;
    quantity_percentage: string;
    value_percentage: string;
}

export interface Order {
    ecom_order_id: number;
    date: Date;
    total: string;
    point_sale: string;
}
