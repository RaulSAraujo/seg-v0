export interface PurchaseControl {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    produto_chave: number;
    brand: null | string;
    total_six_months: number;
    average_six_months: number;
    total_last_year: number;
    average_last_year: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    StockMovementAnalysisYears: StockMovementAnalysisYear[];
    StockMovementAnalysisMonths: StockMovementAnalysisMonths;
}

export interface StockMovementAnalysisMonths {
    month_period: string[];
    lost_sales: number[];
    invoiced_sales: number[];
    sales_forecast: number[];
    days_without_stock: number[];
    days_without_stock_status: string[];
    cost_status: string[];
    from_to_cost: Array<null | string>;
}

export interface StockMovementAnalysisYear {
    id: number;
    stock_movement_id: number;
    year: number;
    completed: boolean;
    total_sales: number;
    average_sales: number;
}
