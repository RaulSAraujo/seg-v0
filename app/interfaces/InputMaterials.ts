import type { Row as User } from '~/interfaces/User'

export interface InputMaterials {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    purchase_date: null | Date;
    supplier: null | string;
    finality: string;
    quantity_purchase: number;
    total_cost: null | string;
    unit_cost: null | string;
    requested_by: string;
    payment_method: null | string;
    purchased_by: null | string;
    description: string;
    status: string;
    received_date: null | Date;
    observation: string;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithUser extends Row {
    user: User;
}

export interface Form {
    description: string;
    finality: string;
    quantity_purchase: number;
    payment_method: string | null;
    observation: string;
}

export interface Response {
    message: string;
    success: boolean;
    result: Row[];
}