import type { Row } from "~/interfaces/Company";
import type { Form } from "~/interfaces/Printers";


export async function creation(form: Form) {
    const res = await $api<Row>('/printers-settings', {
        method: 'POST',
        body: form
    })

    return res
}

