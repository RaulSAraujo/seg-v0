import type { Row } from "~/interfaces/Pstatus";
import type { Row as RowProduct } from '~/interfaces/Product'

import { getActiveProductStatusIds } from "~/composables/product_status_table/productStatusMapper";

export interface PstatusUpdateResponse {
    message?: string;
    result?: any[];
    success?: boolean;
}

export interface BlockedStatusResponse {
    message: string;
    result: any[];
    success: boolean;
}

export async function updatePstatus(id: number, items: Row[]) {
    const activeStatus = getActiveProductStatusIds(items);

    const response = await $api<PstatusUpdateResponse>(`/product`, {
        method: "PUT",
        body: {
            id,
            pstatuses: activeStatus.value
        },
    });

    return response;
}

export async function addBlockedStatus(product: RowProduct) {
    const response = await $api<BlockedStatusResponse>(`/product/quotation-pack/quotation`, {
        method: "POST",
        body: [
            {
                product_id: product.id,
                supplier_id: product.supplier_preference_id,
                name: product.name,
                availability: 6,
                filepath: "/",
                filename: "",
                lead_time: product.lead_time,
                cost: product.cost,
                active: product.active,
                virtual_quantity: product.virtual_quantity,

            }
        ]
    });

    return response
}

