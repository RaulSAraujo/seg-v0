import type { Row as Package } from './Package'
import type { Row as RowFamily } from './Family'
import type { Row as RowProduct } from './Product'
import type { Row as ProductSell } from './ProductSell'

export interface Kit {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    integration: boolean;
    discount: boolean;
    percentage_discount: number;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithRelationship extends Row {
    ProductSell: ProductSell;
    Products: Product[];
    Families: Family[];
}

export interface Family extends RowFamily {
    KitFamily: KitFamily;
    SellPreference: Product | null;
    ProductSell?: ProductSell;
}

export interface KitFamily {
    id: number;
    kit_id: number;
    family_id: number;
    filepath: string;
    qtd_itens: number;
    created_at: string | Date;
    updated_at: string | Date;
}

export interface Product extends RowProduct {
    Package?: Package | null;
}

export interface TransformedKit {
    id: number;
    name: string;
    erp_product_id: number;
    produto_chave: number;
    description: string;
    qtd_itens: number;
    quantity: number;
    virtual_quantity: number;
    lead_time: number;
    observation: string;
}