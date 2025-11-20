import type { Row as ProductSellRow } from '~/interfaces/ProductSell'

export interface ProductSellListResponse {
    rows: ProductSellRow[];
    totalRecords: number;
    resultCount: number;
}

export interface ChangeFamilyResponse {
    message?: string;
    result?: any[];
    success?: boolean;
}

export async function findFamily(id: string) {
    const products = await $api<ProductSellListResponse>(`/product-sell`, {
        query: {
            id
        }
    })

    const sorted = useSorted(products.rows, (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;

        return 0;
    })

    return sorted.value
}

export async function changeFamily(id: string, produto_chave: number) {
    const response = await $api<ChangeFamilyResponse>(`/product`, {
        method: "PUT",
        body: {
            id,
            produto_chave: produto_chave,
        },
    });

    return response
}

