import type { Row, Form } from '~/interfaces/Supplier'

export interface SupplierResponse extends Row {
    message?: string;
}

export async function creation(form: Form) {
    const res = await $api<SupplierResponse>('/supplier', {
        method: 'POST',
        body: {
            name: form.name.toUpperCase(),
            active: form.active,
            lead_time: form.lead_time || 0,
            virtual_quantity: form.virtual_quantity || 0,
        }
    })

    return res;
}

