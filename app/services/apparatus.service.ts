import type { Row, Form } from '~/interfaces/Apparatus'

export interface ApparatusResponse extends Row {
    message?: string;
}

export async function creation(form: Form) {
    const res = await $api<ApparatusResponse>('/apparatus', {
        method: 'POST',
        body: form,
    })

    return res;
}

