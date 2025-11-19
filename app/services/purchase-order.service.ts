import type { Row, Quotation } from '~/interfaces/Product';

import { prepareQuotation } from '~/composables/purchase_order/quotationMapper';

export async function putInvoiceProduct(product: Partial<Row>) {
    const response = await $api(`/product`, {
        method: "PUT",
        body: {
            id: product.id,
            icms_percentage: product.icms_percentage,
            diff_icms_percentage: product.diff_icms_percentage,
            ipi_percentage: product.ipi_percentage,
            icms_st_percentage: product.icms_st_percentage,
            freight: product.freight,
            others_cost: product.others_cost,
            icms: product.icms,
            diff_icms: product.diff_icms,
            icms_st: product.icms_st,
            ipi: product.ipi,
        },
    });

    return response;
}


export async function updateQuotationPack(quotation: Quotation, name: string, costChanged: boolean) {
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
}

