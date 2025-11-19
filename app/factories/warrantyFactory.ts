import type { RowWithRelationship } from '~/interfaces/Warranty'

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export function createDefaultWarranty(overrides?: Partial<RowWithRelationship>): RowWithRelationship {
    return {
        id: undefined,
        garantia: 0,
        usuario: '',
        dtabertura: null,
        n_serie_venda: '',
        n_serie_devolucao: '',
        notafiscal_venda: '',
        notafiscal_devolucao: '',
        dtnotafiscal_venda: null,
        dtnotafiscal_devolucao: null,
        cliente: '',
        cpf_cnpj: '',
        n_marketplace: '',
        indicacao: null,
        internal_cnpj: '',
        acao_tomada: null,
        situacao_garantia: null,
        motivo_garantia: null,
        causa_garantia: null,
        descricao_problema: '',
        conta_devolucao: null,
        estorno_credito: false,
        dtestorno: null,
        bank_data: null,
        valor_total: '',
        tipo_garantia: null,
        valor_mercado_pago: '',
        valor_devolucao: '',
        packing_user_id: null,
        expedition_problem: null,
        created_at: new Date(),
        updated_at: new Date(),
        createWithoutTag: false,
        WarrantyRmaProducts: [],
        User: null,
        // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
        ...(overrides || {})
    };
}