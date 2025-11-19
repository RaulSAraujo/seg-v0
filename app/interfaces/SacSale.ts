export interface SacSale {
    rows: RowWithRelations[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    customer_id: number;
    seller: string;
    sale_date: Date | null;
    status: string;
    negotiation_limit: string;
    payment_type: null | string;
    product_total: string;
    discount_percentage: string | number;
    discount_total: string | number;
    sub_total: string;
    total: string;
    exported_tray: boolean;
    ecom_order_id: number | null;
    ecom_order_link: null | string;
    created_at: Date;
    updated_at: Date;
    observation: string;
}

export interface RowWithRelations extends Row {
    Customer: CustomerWithAddresses;
    SacSaleProducts: SacSaleProduct[];
    SacSaleShipment: SacSaleShipment | null;
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
    birth_date: Date;
    gender: string;
    email: string;
    total_orders: number;
    company_name: string;
    blocked: boolean;
    last_purchase: Date;
    created_at: Date;
    updated_at: Date;
}

export interface CustomerWithAddresses extends Customer {
    CustomerAddresses: CustomerAddress[];
}

export interface CustomerAddress {
    id: number;
    ecom_customer_address_id: number;
    ecom_customer_id: number;
    address: string;
    number: string;
    neighborhood: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    complement: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export interface SacSaleProduct {
    id: number;
    sac_sale_id: number;
    manufacturer_code: string;
    auxiliary_code: number;
    device: string;
    description: string;
    price: string;
    discounted_price: string | number;
    cost: string;
    quantity: number;
    total: string | number;
    sell_contribution_margin: string;
    sell_gross_margin: string;
    buy_contribution_margin: string;
    buy_gross_margin: string;
    is_valid_margin: boolean;
    price_difference: string | number;
    price_difference_total: string | number;
    exported_tray: boolean;
    created_at: Date;
    updated_at: Date;
    contribution_margin_price: number;
    discounted_contribution_margin_price: number;
    gross_margin_percentage: number;
    discounted_gross_margin_percentage: number;
}

export interface SacSaleShipment {
    id: number;
    sac_sale_id: number;
    name: string;
    integrator: string;
    information: string;
    estimated_delivery_date: string;
    price: string;
    discount_total: string | null;
    remaining_quantity: string | null;
    created_at: Date | string | null;
    updated_at: Date | string | null;
}

export interface Discount {
    discount_percentage: number;
    discount_total: number;
    product_discount: number;
    product_discount_total: number;
    payment_type_discount: number;
    payment_type_discount_total: number;
}

export interface FormProducts {
    name?: string;
    produto_chave?: string;
}





