import type { Row } from "~/interfaces/PurchaseRequest";

export interface PurchaseRequestResponse extends Row {
    message?: string;
    success?: boolean;
}

export interface TrayOrderLinkResponse {
    url: string;
}

export async function updatePurchaseRequest(form: Partial<Row>) {
    return await $api<PurchaseRequestResponse>('/purchase-request', {
        method: 'PUT',
        body: form
    });
}

export async function getTrayOrderLink(saleId: string) {
    return await $api<TrayOrderLinkResponse>('/tray-commerce/get-order-link', {
        query: {
            ecom_order_id: saleId
        }
    })
}

