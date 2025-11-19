import type { Row } from "~/interfaces/PurchaseControlProduct";

export async function updatePendingPrice(body: Partial<Row>) {
    const res = await $api(`/pendency-price/purchase-control-product`, {
        method: "PUT",
        body: body,
    });

    return res
}

