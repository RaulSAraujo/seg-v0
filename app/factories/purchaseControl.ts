import type { Row } from '~/interfaces/PurchaseControl';

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export const createDefaultPurchaseControl = (overrides?: Partial<Row>): Row => ({
    id: 0,
    user: '',
    buy_at: null,
    supplier: '',
    erp_order: '',
    description: '',
    observation: '',
    supplier_order: '',
    created_at: new Date(),
    updated_at: new Date(),
    PurchaseControlProducts: [],
    // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
    ...(overrides || {})
});
