import type { ImportOrdersProduct, Response } from '~/interfaces/ImportOrders'

export async function updateImportOrdersProducts(form: Partial<ImportOrdersProduct>) {
    const res = await $api<Response>('/import-order/import-orders-products', {
        method: 'PUT',
        body: form
    })

    return res
}

