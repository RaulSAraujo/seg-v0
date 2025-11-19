import type { RowWithUser, Form, Row } from "~/interfaces/OrdersMl";

export async function creationOrderMl(form: Form) {
    const { data } = useAuth();

    const res = await $api<RowWithUser>('/orders-finality-stock-ml', {
        method: 'POST',
        body: {
            ...form,
            status: "EM ABERTO",
            purchased_by: data.value?.name,
        }
    })

    return res
}

export async function updateOrderMl(form: Partial<Row>) {
    const res = await $api<RowWithUser>('/orders-finality-stock-ml', {
        method: 'PUT',
        body: form
    })

    return res
}

