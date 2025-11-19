import type { Row, RowWithUser } from '~/interfaces/ImportOrders'

export async function creationImportOrders(form: Partial<Row> & { user: number }) {
    const res = await $api<RowWithUser>('/import-order', {
        method: 'POST',
        body: form
    })

    return res
}

export async function creationImportOrdersProducts(form: Partial<Row>) {
    const res = await $api('/import-order/import-orders-products', {
        method: 'POST',
        body: form
    })

    return res
}

