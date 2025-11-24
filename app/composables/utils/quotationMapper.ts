import type { Quotation } from '~/interfaces/Product';

export function prepareQuotation(quotation: Quotation) {
    const { transformDateDatabase } = useDateConversion();

    // Removendo relacionamentos
    delete quotation.Supplier;

    // Formatação de datas
    const transformed = transformDateDatabase(quotation);

    return transformed;
}

