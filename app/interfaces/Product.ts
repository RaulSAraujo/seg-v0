import type { Row as RowFamily } from './Family'
import type { Row as RowPstatus } from './Pstatus'
import type { Row as RowPackage } from './Package'
import type { Row as RowSell } from './ProductSell'
import type { Row as RowSupplier } from './Supplier'
import type { Row as RowTablePrice } from './TablePrice'
import type { PAvailabilityHistory } from './AvailabilityHistory'

export interface Product {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    availability: number;
    type_id: number;
    type: string;
    erp_product_id: number;
    supplier_preference_id: number;
    package_id: number | null;
    name: null | string;
    produto_chave: number | null;
    quantity: number;
    virtual_quantity: number | null;
    virtual_quantity_at: Date | null;
    lead_time: number | null;
    lead_time_at: Date | null;
    virtual_stock_temporary: boolean;
    virtual_stock_temporary_at: string | Date | null;
    virtual_stock_permanent: boolean;
    virtual_stock_permanent_at: string | Date | null;
    length: null | string | number;
    width: null | string | number;
    height: null | string | number;
    gross_weight: null | string | number;
    weight: null | string | number;
    weight_cubic: null | string | number;
    brand: string;
    description: null | string;
    erp_syncecom: boolean;
    erp_category: null | string;
    erp_color: null | string;
    apparatus: null | string;
    ncm: null | string;
    cest: null | string;
    saldo_total_c: number | null;
    tipo_produto: number;
    endereco_estoque: null | string;
    unidade_c: string;
    synced_from_erp_at: string;
    observation: null | string;
    observation_cod_fab: string | null;
    erp_stock_movement_at: Date | null;
    classificacao: string | null;
    cost: null | string;
    cost_at: Date | null;
    liquidation: boolean;
    promotion_price: null | string;
    promotion_starts_at: Date | null;
    promotion_ends_at: Date | null;
    price: string;
    counter_price: string;
    price_table_id: number | null;
    pendente: boolean;
    model: null | string;
    active: boolean;
    image: boolean | null;
    support: boolean | null;
    warranty_days: number;
    icms_percentage: string;
    icms: null | string;
    diff_icms_percentage: string;
    diff_icms: null | string;
    icms_st_percentage: string;
    icms_st: null | string;
    ipi_percentage: string;
    ipi: null | string;
    freight: null | string;
    others_cost: null | string;
    tax_factor: string;
    quantity_purchased: number | null;
    quantity_reserved: number | null;
    description_ecom: null;
    info: null | string;
    ean: string;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithRelationship extends Row {
    Family: RowFamily;
    ProductSell: RowSell | null;
    Quotations?: Quotation[] | null;
    SupplierPreference: RowSupplier;
    Pstatuses?: Pstatus[] | null;
    Package: RowPackage | null;
    TablePrice: RowTablePrice | null;
    WarehousesAddresses?: WarehousesAddresses[] | null;
    PreferentialWarehouse?: PreferentialWarehouse | null;
    PAvailabilityHistories: PAvailabilityHistory[];
}

export interface Pstatus extends RowPstatus {
    ProductPstatus?: ProductPstatus;
}

export interface ProductPstatus {
    id: number;
    product_id: number;
    pstatus_id: number;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface Quotation {
    id: number;
    product_id: number;
    supplier_id: number;
    filepath: "/";
    filename: string;
    cost: null | string | number;
    cost_at: Date | string | null;
    availability: number | null;
    availability_at: Date | string | null;
    lead_time: number | null;
    lead_time_at: Date | null;
    virtual_quantity: number | null;
    virtual_quantity_at: Date | null;
    observation: string;
    active: boolean;
    created_at: Date;
    updated_at: Date;
    Supplier?: RowSupplier;
}

export interface PreferentialWarehouse {
    almox: number;
    codprod: number;
    lote: string;
    estatual: string;
    indice: null | string;
    tiporeplique: boolean;
    localizacao: null | string;
    dtvenda: null;
    dtcompra: Date | null;
    estminimo: null | string;
    created_at: Date;
    updated_at: Date;
}

export interface WarehousesAddresses {
    almox: number;
    codprod: number;
    lote: string;
    estatual: string;
    indice: null;
    tiporeplique: boolean;
    localizacao: null;
    dtvenda: null;
    dtcompra: null;
    estminimo: null;
    created_at: Date;
    updated_at: Date;
}