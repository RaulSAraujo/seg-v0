import type { Row, RowWithUser } from '~/interfaces/ImportOrders'

export interface ImportOrderCreationResponse extends RowWithUser {
    message?: string;
    success?: boolean;
}

export interface ImportOrderProductCreationResponse extends Row {
    message?: string;
    success?: boolean;
}

export async function creationImportOrders(form: Partial<Row> & { user: number }) {
    const res = await $api<ImportOrderCreationResponse>('/import-order', {
        method: 'POST',
        body: form
    })

    return res
}

export async function creationImportOrdersProducts(form: Partial<Row>) {
    const res = await $api<ImportOrderProductCreationResponse>('/import-order/import-orders-products', {
        method: 'POST',
        body: form
    })

    return res
}

