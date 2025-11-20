import type { Row } from "~/interfaces/SalesOrderSeparation";

export interface ProcessOrdersResponse {
    message: string;
    success: boolean;
    result: any;
}

export interface OrdersByTypeResponse {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export async function processOrdersSalesOrderSeparation() {
    return await $api<ProcessOrdersResponse>('/sales-orders-separation/process-orders')
}

export async function getOrdersByTypeSalesOrderSeparation(type: string) {
    return await $api<OrdersByTypeResponse>(`/sales-orders-separation/get-orders-by-type`, {
        query: {
            type: type
        }
    })
}

