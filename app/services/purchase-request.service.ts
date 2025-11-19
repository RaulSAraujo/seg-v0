import type { Row } from "~/interfaces/PurchaseRequest";

export async function updatePurchaseRequest(form: Partial<Row>) {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch('/purchase-request', {
        method: 'PUT',
        body: form
    });
}

export async function getTrayOrderLink(saleId: string) {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch('/tray-commerce/get-order-link', {
        params: {
            ecom_order_id: saleId
        }
    })
}

