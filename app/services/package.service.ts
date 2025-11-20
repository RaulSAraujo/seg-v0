import type { Row } from '~/interfaces/Package'

export interface PackageResponse extends Row {
    message: string;
}

export async function creation(form: Row) {
    const res = await $api<PackageResponse>('/package', {
        method: 'POST',
        body: form
    })

    return res
}

export async function update(form: Row) {
    const res = await $api<PackageResponse>('/package', {
        method: 'PUT',
        body: form
    })

    return res
}

