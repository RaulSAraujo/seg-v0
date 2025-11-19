export interface Dashboard {
    all_orders: AllOrder[];
    delayed_and_priority_orders: DelayedAndPriorityOrders;
    marketplace_order_delays: MarketplaceOrderDelay[];
    user_ranking: UserRanking[];
    weekly_performance: WeeklyPerformance[];
}

export interface AllOrder {
    status: string;
    percentage: string;
    count: number;
}

export interface DelayedAndPriorityOrders {
    delayed: string;
    priority: string;
    delayed_sale_ids: number[];
    priority_sale_ids: number[];
}

export interface MarketplaceOrderDelay {
    marketplace: string;
    count: number;
    weekday: number;
}

export interface UserRanking {
    user: string;
    total_quantity: number;
    total_weight_cubic: string;
    warranty: Warranty;
    correios?: number;
    kangu?: number;
    magazine_luiza?: number;
    mandae?: number;
    mercado_livre: number;
    shopee?: number;
    smart_envios?: number;
    total_express?: number;
    average_time: string;
    score: string;
    rank: number;
    retirada_na_loja?: number;
    sem_transportadora?: number;
    jadlog?: number;
}

export interface Warranty {
    quantity: number;
    ids: number[];
}

export interface WeeklyPerformance {
    marketplace: string;
    weeks: Week[];
}

export interface Week {
    id: number | null;
    marketplace: string;
    performance: "BAIXO" | "MÉDIO" | "ALTO" | null;
    created_at: null;
    updated_at: null;
    editable: boolean;
}
