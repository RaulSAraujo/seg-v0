import type { Row, Form, Response, RowWithUser } from "~/interfaces/SupplierPasswords";

export async function creationSupplierPasswords(form: Form) {
    return await $api<RowWithUser>('/supplier-passwords', {
        method: 'POST',
        body: form
    });
}

export async function updateSupplierPasswords(form: Partial<Row>) {
    return await $api<Response>('/supplier-passwords', {
        method: 'PUT',
        body: form
    });
}

