import type { Row as Product } from '~/interfaces/Product'

export interface Warranty {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number | undefined;
    garantia: number;
    usuario: string;
    dtabertura: Date | string | null;
    n_serie_venda: string;
    n_serie_devolucao: string;
    notafiscal_venda: string;
    notafiscal_devolucao: string;
    dtnotafiscal_venda: Date | string | null;
    dtnotafiscal_devolucao: Date | string | null;
    cliente: string;
    cpf_cnpj: string;
    n_marketplace: string;
    indicacao: null | string;
    internal_cnpj: string;
    acao_tomada: string | null;
    situacao_garantia: string | null;
    motivo_garantia: string | null;
    causa_garantia: string | null;
    descricao_problema: string;
    conta_devolucao: string | null;
    estorno_credito: boolean;
    dtestorno: Date | string | null;
    bank_data: null;
    valor_total: string;
    tipo_garantia: string | null;
    valor_mercado_pago: string;
    valor_devolucao: string;
    packing_user_id: number | null;
    expedition_problem: string | null;
    created_at: Date;
    updated_at: Date;
    createWithoutTag: boolean;
}

export interface RowWithRelationship extends Row {
    WarrantyRmaProducts: WarrantyRmaProduct[];
    User: {
        id: number;
        username: string;
    } | null;
}

export interface WarrantyRmaProduct {
    id: number;
    id_garantia: number;
    garantia: number;
    codbarra: string;
    produto_chave: string;
    codfabricante: string;
    descricao_produto: string;
    quantidade: number;
    quantidade_devolvida: number;
    valor_unitario: string;
    selected: boolean;
    tags: Tag[];
    image: string;
    created_at: Date;
    updated_at: Date;
}

export interface Tag {
    id: number;
    name: string;
    active: boolean;
    Product: Product;
    created_at: Date;
    deleted_at: null;
    product_id: number;
    updated_at: Date;
    erp_order_id: number;
    ecom_order_id: number;
    produto_chave: number;
    erp_product_id: number;
}
