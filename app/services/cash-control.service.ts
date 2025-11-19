import type { Row, Form } from "~/interfaces/CashControl";

export async function creationCashControlApi(form: Form) {
    return await $api<Row>('/reception-cash-control', {
        method: 'POST',
        body: form
    });
}

export async function generatePdfReportApi(start_date: string, end_date: string) {
    return await $api<{ url: string }>('/reception-cash-control/generate-pdf', {
        method: 'POST',
        body: {
            type: "PdfReport",
            params: {
                start_date,
                end_date
            },
        }
    });
}

export async function generatePdfCashDropApi() {
    return await $api<{ url: string }>('/reception-cash-control/generate-pdf', {
        method: 'POST',
        body: {
            type: "PdfCashDrop",
        }
    });
}

