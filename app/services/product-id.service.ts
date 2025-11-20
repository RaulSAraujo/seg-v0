import type { Row } from "~/interfaces/Product";

import { prepareProductDetailsForApi } from "~/composables/product_id/productMapper";

export interface ProductResponse {
    message?: string;
    result?: Row[];
    success?: boolean;
}

export interface ProductDeleteResponse {
    message: string;
    success: boolean;
}

export interface MountAdDescriptionResponse {
    description: string;
}

export async function putProduct(
    body: Partial<Row>,
    pstatuses?: number[],
    productMeasurementsChanged = false,
) {
    const prepare = prepareProductDetailsForApi(body, productMeasurementsChanged);

    const response = await $api<ProductResponse>(`/product`, {
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

    const response = await $api<ProductDeleteResponse>(`/product/${id}`, {
        method: 'DELETE',
    });

    return response
}

export async function getMountAdDescription(id: string) {
    const response = await $api<MountAdDescriptionResponse>(`/product/mount-ad-description`, {
        query: {
            id: id
        }
    });

    return response
}

