export interface SupplierPasswordsLogs {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    supplier_passwords_id: number;
    supplier_name: string;
    user_id: number;
    description: string;
    old_value: string;
    new_value: string;
    created_at: Date;
    updated_at: Date;
    User: User;
    SupplierPassword: SupplierPassword;
}

export interface SupplierPassword {
    id: number;
    supplier: string;
    supplier_username: string;
    supplier_password: string;
    created_at: Date;
    updated_at: Date;
}

export interface User {
    id: number;
    name: string;
    username: string;
    group_id: number;
}
