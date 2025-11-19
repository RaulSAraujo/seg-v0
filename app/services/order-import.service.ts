import type { ImportOrdersProduct } from '~/interfaces/ImportOrders'

export async function updateImportOrdersProducts(form: Partial<ImportOrdersProduct>) {
    const res = await $api('/import-order/import-orders-products', {
        method: 'PUT',
        body: form
    })

    return res
}

