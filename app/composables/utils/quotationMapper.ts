import type { Quotation } from '~/interfaces/Product';

export function prepareQuotation(q: Quotation) {
    const dayjs = useDayjs();

    // Removendo relacionamentos
    delete q.Supplier

    // Formatação de datas
    q.cost_at = dayjs(q.cost_at, "DD/MM/YYYY").format("YYYY-MM-DD");
    q.availability_at = dayjs(q.availability_at, "DD/MM/YYYY").format("YYYY-MM-DD");

    return {
        ...q,
    };
}

