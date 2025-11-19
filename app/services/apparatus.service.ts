import type { Row, Form } from '~/interfaces/Apparatus'

export async function creation(form: Form) {
    const res = await $api('/apparatus', {
        method: 'POST',
        body: form,
    })

    return res as Row;
}

