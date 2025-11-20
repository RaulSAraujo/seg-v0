import type { RowWithRelationship } from "~/interfaces/ProductSell";

export interface ProductSellResponse extends RowWithRelationship {
    message?: string;
    success?: boolean;
}

export async function getProductSellById(id: string) {
    return await $api<ProductSellResponse>(`/product-sell/${id}`);
}

export async function updateProductSellId(product: RowWithRelationship) {
    await $api<ProductSellResponse>(`/product-sell/${product.id}`, {
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

