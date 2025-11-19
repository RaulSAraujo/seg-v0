import type { RowWithAddress as Client } from '~/interfaces/Client'

export interface Customer {
    rows: RowWithAddresses[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
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

export interface RowWithAddresses extends Row {
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

export interface CustomerWithClient {
    rows: [{ customer: RowWithAddresses; client: Client }];
    totalRecords: number;
    resultCount: number;
}