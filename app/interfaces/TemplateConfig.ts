import type { Row as User } from '~/interfaces/User'

export interface TemplateConfig {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    category_id: number;
    apparatus_id: number;
    template_id: number;
    user: string;
    created_at: string;
    updated_at: string;
    Apparatu: Apparatu;
    CategoryEcom: Ecom;
    TemplateEcom: Ecom;
}

export interface Apparatu {
    id: number;
    erp_id: number;
    apparatus_name: string;
    classification_apparatus_id: number;
    created_at: string;
    updated_at: string;
}

export interface Ecom {
    id: number;
    category_name?: string;
    created_at: null | string;
    updated_at: null | string;
    description?: string;
}

export interface Form {
    apparatus_id?: number;
    category_id?: number;
}

export interface ResponseTemplateEcom {
    id: number;
    description: string;
    updated_at: string;
    created_at: string;
    User: User;
    success: boolean;
    message: string;
}

export interface ResponseTemplateConfig {
    id: number;
    user: string;
    template_id: number;
    apparatus_id: number;
    category_id: number;
    updated_at: string;
    created_at: string;
    User: User;
    success: boolean;
    message: string;
}