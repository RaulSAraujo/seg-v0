import type { Row as UserRow } from '~/interfaces/User'

export interface OrdersMl {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    purchase_date: Date;
    finality: string;
    quantity_purchase: number;
    total_cost: string;
    unit_cost: string;
    purchased_by: string;
    description: string;
    tracking_code: string;
    status: string;
    received_date: Date | null;
    review_data: Date | null;
    limit_date: Date | null;
    seller: string;
    form_payment: string;
    refund: boolean;
    refund_date: string | null;
    observation: string;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithUser extends Row {
    User: UserRow
}


export interface Form {
    tracking_code: string;
    description: string;
    finality: string;
    quantity_purchase: number;
    review_data: string | null;
    limit_date: string | null;
    seller: string;
    total_cost: string;
    form_payment: null | string;
    observation: string;
    account: string | null;
}
