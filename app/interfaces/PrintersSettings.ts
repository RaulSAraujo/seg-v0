export interface PrintersSettings {
    rows:         Row[];
    totalRecords: number;
    resultCount:  number;
}

export interface Row {
    id:         number;
    user:       string;
    printer:    string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
