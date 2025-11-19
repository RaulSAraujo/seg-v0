export interface ShippingValidation {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    tags: Tag[];
    ecom_order_id: number;
    ecom_customer_id: number;
    shipping_status: null;
    customer_freight_price: string;
    actual_freight_price: string;
    freight_diff_price: string | null;
    bill_freight_price: null;
    observation: null;
    nro_fatura: null;
    shipping_volume: number;
    shipping_validated: boolean;
    shipping_finished: boolean;
    imported_invoices: ImportedInvoices[] | null
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    Order: Order;
    Customer: Customer;
}

export interface Customer {
    id: number;
    ecom_customer_id: number;
    name: string;
    cnpj: string;
    cpf: string;
    rg: string;
    phone: string;
    cellphone: string;
    birth_date: Date | null;
    gender: string;
    email: string;
    total_orders: number;
    company_name: string;
    blocked: boolean;
    last_purchase: Date | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface Order {
    id: number;
    ecom_order_id: number;
    status: string;
    date: Date;
    customer_id: number;
    taxes: string;
    discount: string;
    point_sale: string;
    shipment: string;
    shipment_value: string;
    delivered: boolean;
    shipping_cancelled: boolean;
    store_note: string;
    customer_note: string;
    discount_coupon: string;
    sending_code: string;
    sending_date: Date | null;
    delivery_time: string;
    payment_method: string;
    total: string;
    payment_date: Date | null;
    shipment_integrator: string;
    modified: Date;
    estimated_delivery_date: Date | null;
    tracking_url: string;
    delivery_date: null;
    cost: string;
    invoice_number: null | string;
    invoice_date: Date | null;
    mercado_livre_order_id: null | string;
    mercado_livre_shipping_id: null | string;
    marketplace_seller_name: null | string;
    seller: string;
    marketplace_order_id: null | string;
    delayed_or_in_transfer: boolean | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface Tag {
    id: number;
    name: string;
    description: string;
    produto_chave: number;
}

export interface ImportedInvoices {
    nro_fatura: string;
    bill_freight_price: number;
}
