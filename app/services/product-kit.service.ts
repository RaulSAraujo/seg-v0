import type { Row } from "~/interfaces/Product";

export interface ProductListResponse {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface KitUpdateResponse {
    message: string;
    result: any[];
    success: boolean;
}

export async function findProduct(name: string) {
    const response = await $api<ProductListResponse>(`/product`, {
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

export async function updateCompositionKit(typeId: string, families: { id: number, qtd_itens: number }[]) {
    const res = await $api<KitUpdateResponse>(`/product/kit`, {
        method: "PUT",
        body: {
            id: typeId,
            families: families,
            removeFamilies: [],
        }
    })

    return res
}

export async function removeCompositionKit(typeId: string, remove_id: number) {
    const res = await $api<KitUpdateResponse>(`/product/kit`, {
        method: "PUT",
        body: {
            id: typeId,
            families: [],
            removeFamilies: [remove_id],
        }
    })

    return res
}

