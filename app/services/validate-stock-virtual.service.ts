import type { Row } from "~/interfaces/ValidateVirtualStock";

export function updateValidateStockVirtual(form: Partial<Row>) {
    return $api('/validate-virtual-stock', {
        method: 'PUT',
        body: form
    });
}

