import type { Row as Product } from '~/interfaces/Product'
import type { Row as User } from '~/interfaces/User'

export interface ValidateProductsImage {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    user_id: number;
    product_id: number;
    produto_chave: number;
    name: string;
    brand: string;
    description: string;
    conclusion_date: null;
    status: string;
    observation: string;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    Product: Product;
    User: User;
}

export interface Form {
    name: string;
    status: string;
}