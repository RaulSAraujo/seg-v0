import type { RowWithRelationship } from "~/interfaces/Warranty";

export async function getWarrantyOrdersById(idWarranty: string) {
    return await $api<RowWithRelationship>("/warranty/orders", {
        query: { id: idWarranty }
    });
}

export async function trayCommerceGetOrderLink(ecom_order_id: number) {
    return await $api(`/tray-commerce/get-order-link`, {
        query: { ecom_order_id }
    });
}

export async function reprintTagById(id: number) {
    return await $api(`/stock-tag-control/reprint`, {
        query: { id }
    });
}

