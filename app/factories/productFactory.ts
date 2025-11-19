// src/utils/productFactory.ts
import type { Row, Quotation } from '~/interfaces/Product'; // Ajuste o caminho conforme sua estrutura

/**
 * Cria um novo objeto Row com valores padrão.
 * Permite sobrescrever valores específicos através do parâmetro overrides.
 * @param overrides Um objeto Partial<Row> com os valores a serem sobrescritos.
 * @returns Um objeto Row completo com valores padrão ou sobrescritos.
 */
export function createDefaultProduct(overrides?: Partial<Row>): Row {
    return {
        id: 0,
        availability: 0,
        type_id: 0,
        type: '',
        erp_product_id: 0,
        supplier_preference_id: 0,
        package_id: null,
        name: null,
        produto_chave: null,
        quantity: 0,
        virtual_quantity: null,
        virtual_quantity_at: null,
        lead_time: null,
        lead_time_at: null,
        virtual_stock_temporary: false,
        virtual_stock_temporary_at: null,
        virtual_stock_permanent: false,
        virtual_stock_permanent_at: null,
        length: null,
        width: null,
        height: null,
        gross_weight: null,
        weight: null,
        weight_cubic: null,
        brand: '',
        description: null,
        erp_syncecom: false,
        erp_category: null,
        erp_color: null,
        apparatus: null,
        ncm: null,
        cest: null,
        saldo_total_c: null,
        tipo_produto: 0,
        endereco_estoque: null,
        unidade_c: '',
        synced_from_erp_at: '',
        observation: null,
        observation_cod_fab: null,
        erp_stock_movement_at: null,
        classificacao: null,
        cost: null,
        cost_at: null,
        liquidation: false,
        promotion_price: null,
        promotion_starts_at: null,
        promotion_ends_at: null,
        price: '',
        counter_price: '',
        price_table_id: null,
        pendente: false,
        model: null,
        active: false,
        image: null,
        support: null,
        warranty_days: 0,
        icms_percentage: '',
        icms: null,
        diff_icms_percentage: '',
        diff_icms: null,
        icms_st_percentage: '',
        icms_st: null,
        ipi_percentage: '',
        ipi: null,
        freight: null,
        others_cost: null,
        tax_factor: '',
        quantity_purchased: null,
        quantity_reserved: null,
        description_ecom: null,
        info: null,
        ean: '',
        created_at: new Date(),
        updated_at: new Date(),
        // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
        ...(overrides || {})
    };
}

export function createDefaultProductQuotation(overrides?: Partial<Quotation>): Quotation {
    return {
        id: 0,
        product_id: 0,
        supplier_id: 0,
        filepath: '/',
        filename: '',
        cost: null,
        cost_at: null,
        availability: null,
        availability_at: null,
        lead_time: null,
        lead_time_at: null,
        virtual_quantity: null,
        virtual_quantity_at: null,
        observation: '',
        active: false,
        created_at: new Date(),
        updated_at: new Date(),
        // Sobrescreve os valores padrão com os valores fornecidos em 'overrides'
        ...(overrides || {})
    };
}