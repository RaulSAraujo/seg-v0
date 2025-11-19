export interface CounterOrderLog {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    counter_order_id: number;
    type: string;
    message: string;
    created_at: Date;
    updated_at: Date;
}
