export interface Packagelogs {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    user_id: number;
    product_id: number;
    package: null | string;
    old_package: null | string;
    length: null | string;
    old_length: null | string;
    width: null | string;
    old_width: null | string;
    height: null | string;
    old_height: null | string;
    gross_weight: null | string;
    old_gross_weight: null | string;
    weight: null | string;
    old_weight: null | string;
    weight_cubic: null | string;
    old_weight_cubic: null | string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    User: User;
}

export interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    active: boolean;
    is_admin: boolean;
    group_id: number;
    theme: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
