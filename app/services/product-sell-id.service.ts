import type { RowWithRelationship } from "~/interfaces/ProductSell";

export async function getProductSellById(id: string) {
    const { data } = await useFetch(`/product-sell/${id}`);

    return data.value as unknown as RowWithRelationship;
}

export async function updateProductSellId(product: RowWithRelationship) {

    await $api(`/product-sell/${product.id}`, {
        method: "PUT",
        body: {
            syncecom: product.syncecom,
            description: product.description,
            featured_seal: product.featured_seal,
            release_seal: product.release_seal,
            additional_seal: product.additional_seal,
            sync_comclick: product.sync_comclick,
            sync_loja_do_tecnico: product.sync_loja_do_tecnico,
            sync_viziotech: product.sync_viziotech,
        },
    });
}

