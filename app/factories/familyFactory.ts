import type { Row } from '~/interfaces/Family'

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export function createDefaultFamily(overrides?: Partial<Row>): Row {
    return {
        id: 0,
        buy_preference_id: 0,
        model: null,
        product_id: 0,
        quantity: null,
        replace_cost: null,
        created_at: new Date(),
        updated_at: new Date(),
        // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
        ...(overrides || {})
    };
}