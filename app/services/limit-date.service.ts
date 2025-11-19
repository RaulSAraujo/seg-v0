import type { Row, RowWithUser } from "~/interfaces/LimitDate";

export async function creationLimitDate(form: Partial<Row>) {
    const nuxtApp = useNuxtApp()
    return await nuxtApp.$customFetch<RowWithUser>('/limit-date-purchase-control', {
        method: 'POST',
        body: form
    });
}

