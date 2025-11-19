import type { Row as User } from '~/interfaces/User'

export interface SupplierPasswords {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    supplier: string;
    supplier_username: string;
    supplier_password: string;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithUser extends Row {
    User: User
}

export interface Form {
    supplier: string | undefined;
    supplier_username: string;
    supplier_password: string
}

export interface Response {
    message: string;
    success: boolean;
    result: Row[]
}