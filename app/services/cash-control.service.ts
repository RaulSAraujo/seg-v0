import type { Row, Form } from "~/interfaces/CashControl";

export interface CashControlResponse extends Row {
    message?: string;
    success?: boolean;
}

export interface PdfGenerationResponse {
    url: string;
    message?: string;
    success?: boolean;
}

export async function creationCashControlApi(form: Form) {
    return await $api<CashControlResponse>('/reception-cash-control', {
        method: 'POST',
        body: form
    });
}

export async function generatePdfReportApi(start_date: string, end_date: string) {
    return await $api<PdfGenerationResponse>('/reception-cash-control/generate-pdf', {
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
    return await $api<PdfGenerationResponse>('/reception-cash-control/generate-pdf', {
        method: 'POST',
        body: {
            type: "PdfCashDrop",
        }
    });
}

