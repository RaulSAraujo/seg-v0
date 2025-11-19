export interface TablePrice {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    name: string;
    min_price: string;
    max_price: string;
    percentage: string;
    created_at: null;
    updated_at: Date | null;
}


export interface Form {
    name: string;
    max_price: string | number;
    min_price: string | number;
    percentage: string | number;
}