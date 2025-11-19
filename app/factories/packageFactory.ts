import type { Row } from '~/interfaces/Package';

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export const createDefaultPackage = (overrides?: Partial<Row>): Row => ({
    id: 0,
    name: '',
    width: 0,
    height: 0,
    length: 0,
    custom: false,
    package_weight: 0,
    weight_cubic_kg: 0,
    weight_per_cubic_kg: 0.15,
    created_at: new Date(),
    updated_at: new Date(),
    // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
    ...(overrides || {})

});
