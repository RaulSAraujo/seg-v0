import type { Row } from "~/interfaces/Company";
import type { Form } from "~/interfaces/Printers";

export interface PrintersResponse extends Row {
    message?: string;
}

export async function creation(form: Form) {
    const res = await $api<PrintersResponse>('/printers-settings', {
        method: 'POST',
        body: form
    })

    return res
}

