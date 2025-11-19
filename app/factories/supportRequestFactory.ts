import type { Row } from '~/interfaces/SupportRequest';

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export const createDefaultSupportRequest = (overrides?: Partial<Row>): Row => ({
    id: 0,
    title: '',
    classification: '',
    priority: 0,
    user_id: 0,
    status: '',
    created_at: new Date(),
    updated_at: new Date(),
    User: {
        id: 0,
        name: '',
        group_id: 0,
        username: '',
    },
    days_since_opened: 0,
    module: '',
    screen: '',
    SupportRequestLogs: [],
    // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
    ...(overrides || {})
});
