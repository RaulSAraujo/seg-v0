export interface CategoryEcom {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    category_name: string;
    created_at: Date | null;
    updated_at: Date | null;
    deleted_at: null;
}
