import type { Row } from '~/interfaces/Package'

interface Response extends Row {
    message: string;
}

export async function creation(form: Row) {
    const res = await $api<Response>('/package', {
        method: 'POST',
        body: form
    })

    return res
}

export async function update(form: Row) {
    const res = await $api<Response>('/package', {
        method: 'PUT',
        body: form
    })

    return res
}

