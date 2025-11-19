export interface InvoiceRule {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    parameter: string;
    value: number;
    erp_company_id: number;
    route: string;
    created_at: Date;
    updated_at: Date;
    Company: Company;
}

export interface Company {
    id: number;
    erp_id: number;
    cnpj: string;
    fantasy_name: string;
    corporate_name: string;
    warehouse: number;
    warehouse_name: string;
    invoice_company_reference: number;
    preferencial_invoice: boolean;
    preferencial_invoice_at: null;
    preferencial_invoice_until: null;
    created_at: Date;
    updated_at: Date;
}


export interface Form {
    erp_company_id: number | undefined;
    parameter: string;
    label_value: string;
    value: number | undefined;
    route: string
}