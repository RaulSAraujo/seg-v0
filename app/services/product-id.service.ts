import type { Row } from "~/interfaces/Product";

import { prepareProductDetailsForApi } from "~/composables/product_id/productMapper";

export async function putProduct(
    body: Partial<Row>,
    pstatuses?: number[],
    productMeasurementsChanged = false,
) {
    const prepare = prepareProductDetailsForApi(body, productMeasurementsChanged);

    const nuxtApp = useNuxtApp()
    const response = await nuxtApp.$customFetch(`/product`, {
        method: 'PUT',
        body: {
            ...prepare,
            pstatuses
        }
    });

    return response
}

export async function deleteProduct(id: number | undefined) {
    if (!id) return;

    const nuxtApp = useNuxtApp()
    const response = await nuxtApp.$customFetch(`/product/${id}`, {
        method: 'DELETE',
    });


    return response
}

export async function getMountAdDescription(id: string) {
    const nuxtApp = useNuxtApp()
    const response = await nuxtApp.$customFetch(`/product/mount-ad-description`, {
        params: {
            id: id
        }
    });

    return response
}

