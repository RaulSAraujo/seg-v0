export interface Operation {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    resource: string;
    name: string;
    description: null | string;
    model: string;
    front_url: null | string;
    back_url: null | string;
    created_at: Date | null;
    updated_at: Date | null;
}
