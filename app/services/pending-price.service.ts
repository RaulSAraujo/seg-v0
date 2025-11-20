import type { Row } from "~/interfaces/PurchaseControlProduct";

export interface PendingPriceResponse {
    message: string;
    result: Row[];
    success: boolean;
}

export async function updatePendingPrice(body: Partial<Row>) {
    const res = await $api<PendingPriceResponse>(`/pendency-price/purchase-control-product`, {
        method: "PUT",
        body: body,
    });

    return res
}

