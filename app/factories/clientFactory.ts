import type { RowWithAddressSingle } from '~/interfaces/Client';

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export const createDefaultClient = (overrides?: RowWithAddressSingle): RowWithAddressSingle => ({
    id: 0,
    erp_client_id: 0,
    cpf_cnpj: '',
    identity_number: null,
    name: '',
    born_date: null,
    type: false,
    flag_client: 0,
    email: null,
    official_email: null,
    validated_email: false,
    number1: null,
    identifier_number1: null,
    number2: null,
    identifier_number2: null,
    number3: null,
    identifier_number3: null,
    phone_mercado_pago: null,
    gender: '',
    observation: '',
    created_at: new Date(),
    updated_at: new Date(),
    ClientsAddresses: {
        id: 0,
        client_id: 0,
        zipcode: '',
        street: '',
        neighbourhood: '',
        complement: '',
        number: '',
        city: '',
        state: '',
        country: '',
        type: '',
        maps_location: '',
    },
    // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
    ...(overrides || {})
});
