export async function findFamily(id: string) {
    const nuxtApp = useNuxtApp()
    const products = await nuxtApp.$customFetch(`/product-sell`, {
        params: {
            id
        }
    })

    const sorted = useSorted(products, (a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;

        return 0;
    })

    return sorted.value
}

export async function changeFamily(id: string, produto_chave: number) {
    const nuxtApp = useNuxtApp()
    const response = await nuxtApp.$customFetch(`/product`, {
        method: "PUT",
        body: {
            id,
            produto_chave: produto_chave,
        },
    });

    return response
}

