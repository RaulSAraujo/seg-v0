import type { RowWithRelationship } from "~/interfaces/Warranty";

export interface WarrantyOrdersResponse {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface TrayOrderLinkResponse {
    url: string;
}

export interface ReprintTagResponse {
    message: string;
    success: boolean;
}

export async function getWarrantyOrdersById(idWarranty: string) {
    return await $api<WarrantyOrdersResponse>("/warranty/orders", {
        query: { id: idWarranty }
    });
}

export async function trayCommerceGetOrderLink(ecom_order_id: number) {
    return await $api<TrayOrderLinkResponse>(`/tray-commerce/get-order-link`, {
        query: { ecom_order_id }
    });
}

export async function reprintTagById(id: number) {
    return await $api<ReprintTagResponse>(`/stock-tag-control/reprint`, {
        query: { id }
    });
}

