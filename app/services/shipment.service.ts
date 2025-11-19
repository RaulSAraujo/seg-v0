import type { Form, Row } from '~/interfaces/ShipmentOrders'

interface Response {
    message: string;
    result: Row[]
    success: boolean
}

export async function creation(form: Form) {
    const nuxtApp = useNuxtApp()
    const res = await nuxtApp.$customFetch<Response>('/shipment', {
        method: 'POST',
        body: form
    })

    return res
}

export async function update(form: Form) {
    const nuxtApp = useNuxtApp()
    const res = await nuxtApp.$customFetch<Response>('/shipment', {
        method: 'PUT',
        body: form
    })

    return res
}

