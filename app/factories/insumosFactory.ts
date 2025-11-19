import type { Row } from '~/interfaces/InputMaterials';

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export const createDefaultInsumos = (overrides?: Partial<Row>): Row => ({
    id: 0,
    purchase_date: null,
    supplier: null,
    finality: '',
    quantity_purchase: 0,
    total_cost: null,
    unit_cost: null,
    requested_by: '',
    payment_method: null,
    purchased_by: null,
    description: '',
    status: '',
    received_date: null,
    observation: '',
    created_at: new Date(),
    updated_at: new Date(),
    // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
    ...(overrides || {})
});
