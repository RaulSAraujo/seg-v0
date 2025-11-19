export interface Region {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    region: string;
    color: string;
    created_at: Date | null;
    updated_at: Date;
    deleted_at: null;
}
