export interface Supplier {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    name: string;
    active: boolean;
    virtual_quantity: number | null;
    lead_time: number | null;
    created_at: Date;
    updated_at: Date;
}


export interface Form {
    name: string;
    active: boolean;
    lead_time: string | number;
    virtual_quantity: string | number;

}