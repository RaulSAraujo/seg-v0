export interface EventProgress {
    status: string;
    order_count: number;
    confirmation_id: number;
    message: string;
    total?: number
    percentage?: string
}


export interface Form {
    current_status: string | null;
    target_status: string | null;
}