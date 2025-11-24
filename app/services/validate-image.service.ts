import type { FetchError } from "ofetch";
import type { Row, Form } from '~/interfaces/ValidateProductsImage'

export interface ValidateImageResponse extends Row {
    message?: string;
    success?: boolean;
}

export async function creation(form: Form) {
    try {
        const { data: user } = useAuth();

        const res = await $api<ValidateImageResponse>('/validate-products-image', {
            method: 'POST',
            body: {
                name: form.name?.toUpperCase(),
                status: form.status,
                user_id: user.value?.id,
            }
        })

        return res;
    } catch (error) {
        const err = error as FetchError;

        $toast().error(`${err.data?.error ?? err.statusMessage}`);
    }
}

