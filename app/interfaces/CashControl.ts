export interface CashControl {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    description: string;
    payment_form: string;
    type: string;
    value: string;
    effective_date: Date;
    payment_id: number | null;
    user_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    User: User;
}

export interface User {
    id: number;
    name: string;
    username: string;
    group_id: number;
    theme: boolean;
}


export interface CashControlReport {
    total_value_report: number;
    total_value_money: number;
    report: Report[];
}

export interface Report {
    type: string;
    total_value_rows: number;
    rows: Row[];
}

export interface CashDrop {
    result: Result[];
    cash_drop_report: CashDropReport;
}

export interface CashDropReport {
    total_value_report: number;
    total_value_money: number;
    report: Report[];
}

export interface Result {
    id: number;
    description: string;
    type: string;
    payment_form: string;
    value: number;
    user_id: number;
    effective_date: Date;
    updated_at: Date;
    created_at: Date;
}

export interface Form {
    value: string;
    type: string | null;
    description: string;
    payment_form: string | null;
}



