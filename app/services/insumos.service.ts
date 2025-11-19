import type { Row, Response, Form, RowWithUser } from '~/interfaces/InputMaterials'

export async function creationInputMaterials(form: Form) {
    const { data: user } = useAuth();

    const res = await $api<RowWithUser>('/input-materials', {
        method: 'POST',
        body: {
            ...form,
            status: "EM ABERTO",
            requested_by: user.value?.name
        }
    })

    return res
}

export async function updateInputMaterials(form: Partial<Row>) {
    const res = await $api<Response>('/input-materials', {
        method: 'PUT',
        body: form
    })

    return res
}

