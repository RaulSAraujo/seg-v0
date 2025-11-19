import type { Row } from '~/interfaces/ShipmentOrders';

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export const createDefaultShipment = (overrides?: Partial<Row>): Row => ({
    id: 0,
    shipment_company: '',
    shipment_mode: '',
    collect_company: '',
    point_sale: '',
    created_at: new Date(),
    updated_at: new Date(),
    // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
    ...(overrides || {})

});
