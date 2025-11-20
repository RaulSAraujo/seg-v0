import type { Form, Row } from '~/interfaces/ShipmentOrders'

export interface ShipmentResponse {
    message: string;
    result: Row[];
    success: boolean;
}

export async function creation(form: Form) {
    const res = await $api<ShipmentResponse>('/shipment', {
        method: 'POST',
        body: form
    })

    return res
}

export async function update(form: Form) {
    const res = await $api<ShipmentResponse>('/shipment', {
        method: 'PUT',
        body: form
    })

    return res
}

