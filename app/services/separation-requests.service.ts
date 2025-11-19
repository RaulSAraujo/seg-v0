import type { Row } from "~/interfaces/SalesOrderSeparation";

export async function processOrdersSalesOrderSeparation() {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch('/sales-orders-separation/process-orders')
}

export async function getOrdersByTypeSalesOrderSeparation(type: string) {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch<Row[]>(`/sales-orders-separation/get-orders-by-type`, {
        query: {
            type: type
        }
    })
}

