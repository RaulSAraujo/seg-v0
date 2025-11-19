export interface IPAccessList {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    description: string;
    ip_address: string;
    created_at: Date;
    updated_at: Date;
}
