import type { Row as User } from '~/interfaces/User'

export interface ShippingValidation {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    erp_order: number;
    purchase_account: string;
    total_value: string;
    supplier: string;
    created_by: string;
    observation: string;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithRelationship extends Row {
    ImportOrdersProducts: ImportOrdersProduct[];
}

export interface RowWithUser extends Row {
    User: User;
}

export interface ImportOrdersProduct {
    id: number;
    order_id: number;
    platform_order_number: string;
    item_erp: number;
    name: string;
    description: string;
    unit_cost: string;
    last_cost: string;
    taxed_cost: string;
    tribute: string;
    total_cost: string;
    quantity_purchased: number;
    reserved_quantity: number;
    reservation: string;
    tracking_code: null | string;
    receipt_date: Date | null;
    limit_warranty_date: Date;
    status: string;
    form_of_payment: string;
    form_of_payment_tribute: null;
    created_at: Date;
    updated_at: Date;
    observation: string;
    alert_limit_warranty: boolean;
}

export interface Form {
    erp_order: number;
    purchase_account: string;
    supplier: string;
    observation: string;
}

export interface Response {
    message: string;
    success: boolean;
    result: {
        product_updated: ImportOrdersProduct;
        total_value_order: number;
    };
}
