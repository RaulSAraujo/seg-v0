export interface PurchaseControlProduct {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    order_id: number;
    name: string;
    equivalent_name: string | null;
    produto_chave: string;
    ean: string;
    invoice: null | string;
    invoice_issuance_date: Date | null;
    quantity_purchased: number;
    quantity_reserved: number;
    description: null | string;
    seg_cost: string;
    purchase_cost: string;
    invoice_cost: string;
    supplier_cost: string;
    measure: boolean;
    image: boolean | null;
    support: boolean;
    reservation: string;
    receiving_quantity: number;
    receiving_at: Date | string | null;
    status: string;
    sending_limit_at: Date | null;
    temporary_location: string[] | null;
    partial: boolean;
    child: number | null;
    block: boolean;
    item_erp: number | null;
    observation_product: null | string;
    observation_purchase: string;
    difference_invoice_purchase: string;
    difference_invoice_seg: string;
    cost_difference_margin: string;
    cost_validation: boolean;
    cost_validation_at: Date | null;
    created_at: Date;
    updated_at: Date;
    status_limit?: string;
}

export interface Response {
    message: string;
    result: PurchaseControlProduct[];
    success: boolean;
}

export interface UpdateSelectedForm {
    invoice?: string;
    status?: string;
    observation_product?: string;
}

export interface FormPartialProduct {
    productId: number;
    productXml: Row & { quantity: number };
}

export interface ResponsePartialProduct {
    childItem: Row;
    fatherItem: Row;
    itemUpdated: Row;
}