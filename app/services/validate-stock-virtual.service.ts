import type { Row } from "~/interfaces/ValidateVirtualStock";

export interface ValidateStockVirtualResponse {
    message: string;
    result: Row[];
    success: boolean;
}

export async function updateValidateStockVirtual(form: Partial<Row>) {
    return await $api<ValidateStockVirtualResponse>('/validate-virtual-stock', {
        method: 'PUT',
        body: form
    });
}

