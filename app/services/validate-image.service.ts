import type { Row, Form } from '~/interfaces/ValidateProductsImage'

export async function creation(form: Form) {
    const { data: user } = useAuth();

    const res = await $api('/validate-products-image', {
        method: 'POST',
        body: {
            name: form.name.toUpperCase(),
            status: form.status,
            user_id: user.value?.id,
        }
    })

    return res as Row;
}

