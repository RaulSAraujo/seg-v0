import { prepareQuotation } from "~/composables/utils/quotationMapper";
import { prepareProductDetailsForApi } from "~/composables/product_id/productMapper";

import type { Row, Quotation } from '~/interfaces/Product';
import type { ProductSell } from '~/interfaces/ProductSell'

export async function getProduct(name: string) {
    const response = await $api(`/product`, {
        query: {
            page: 1,
            perPage: 50,
            full: false,
            name: `${name}%`,
        }
    })

    const sorted = useSorted(response.rows, (a, b) => {
        if (!a.name || !b.name) return 0;

        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;

        return 0;
    })

    return sorted.value
}

export async function updateProduct(body: Partial<Row>, pstatuses?: number[], productMeasurementsChanged: boolean = false) {
    try {
        // Prepara os dados do produto para envio à API
        const prepare = prepareProductDetailsForApi(body, productMeasurementsChanged);

        // Envia os dados do produto para a API
        const response = await $api<{ result: Row[] }>(`/product`, {
            method: 'PUT',
            body: {
                ...prepare,
                pstatuses
            }
        });

        return response.result;
    } catch (error) {
        const err = error as { statusText: string; name: string };

        $toast().error(`${err.statusText ?? err.name}`);
    }
}

export async function deleteProduct(id: number | undefined) {
    if (!id) return;

    const response = await $api(`/product`, {
        method: 'DELETE',
        params: {
            id: id
        }
    });

    return response
}

export async function getMountAdDescription(id: string) {
    const response = await $api(`/product/mount-ad-description-ecom`, {
        query: {
            id: id
        }
    });

    return response
}

export async function updateQuotationPack(quotation: Quotation, name: string, costChanged: boolean) {
    try {
        const quotationMapper = prepareQuotation(quotation);

        const response = await $api(`/product/quotation-pack/quotation`, {
            method: "POST",
            body: [{
                ...quotationMapper,
                name: name,
                enable_cost_date: costChanged,
            }],
        });

        return response;
    } catch (error) {
        const err = error as { statusText: string; name: string };

        $toast().error(`${err.statusText ?? err.name}`);
    }
}

export async function updateCompositionKit(typeId: string, families: { id: number, qtd_itens: number }[]) {
    const res = await $api(`/product/kit`, {
        method: "PUT",
        body: {
            id: typeId,
            families: families,
            removeFamilies: [],
        }
    })

    return res
}

export async function deleteCompositionKit(typeId: string, remove_id: number) {
    const res = await $api(`/product/kit`, {
        method: "PUT",
        body: {
            id: typeId,
            families: [],
            removeFamilies: [remove_id],
        }
    })

    return res
}

export async function findFamily(id: string) {
    try {
        const products = await $api<ProductSell>(`/product-sell`, {
            params: {
                id
            }
        })

        const sorted = useSorted(products.rows, (a, b) => {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;

            return 0;
        })

        return sorted.value
    } catch (error) {
        const err = error as { statusText: string; message: string };

        $toast().error(`${err.statusText ?? err.message}`);
    }

}

export async function addBlockedStatus(product: Row) {
    const response = await $api(`/product/quotation-pack/quotation`, {
        method: "POST",
        body: [
            {
                product_id: product.id,
                supplier_id: product.supplier_preference_id,
                name: product.name,
                availability: 6,
                filepath: "/",
                filename: "",
                cost: product.cost,
                active: product.active,
                virtual_quantity: product.virtual_quantity,
                lead_time: product.lead_time,
                availability_at: new Date(),
            }
        ]
    });

    return response
}
