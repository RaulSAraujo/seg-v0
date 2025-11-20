import type { Row, RowWithUser } from "~/interfaces/LimitDate";

export async function creationLimitDate(form: Partial<Row>) {
    return await $api<RowWithUser>('/limit-date-purchase-control', {
        method: 'POST',
        body: form
    });
}

