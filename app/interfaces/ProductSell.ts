import type { Row as RowFamily } from './Family'
import type { Row as RowPstatus } from './Pstatus'
import type { Row as RowProduct } from './Product'
import type { Row as RowKit, KitFamily } from './Kit'
import type { PAvailabilityHistory } from './AvailabilityHistory'

export interface ProductSell {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    type_id: number;
    type: string;
    ean_gs1: null;
    model: null | string;
    description: null | string;
    category_id: null;
    quantity: number | null;
    syncecom: boolean;
    syncedecom: boolean;
    syncecominprogress: boolean;
    syncecomfailed: boolean;
    active: boolean;
    image: boolean | null;
    package_id: null;
    length: null;
    width: null;
    height: null;
    weight: null;
    gross_weight: null;
    weight_cubic: null;
    virtual_quantity: number | null;
    lead_time: number | null;
    featured_seal: null;
    release_seal: null;
    additional_seal: null;
    sync_comclick: boolean;
    sync_loja_do_tecnico: boolean;
    sync_viziotech: boolean;
    sell_price: string;
    promotion: boolean;
    liquidation: boolean;
    created_at: Date | string;
    updated_at: Date | string;
}

export interface RowWithRelationship extends Row {
    Family: Family;
    Kit: Kit | null;
    CategoryEcom: null;
}

export interface Family extends RowFamily {
    SellPreference: Product | null;
    Products: Product[];
}

export interface Product extends RowProduct {
    Pstatuses?: Pstatus[];
    PAvailabilityHistories?: PAvailabilityHistory[];
}

export interface Kit extends RowKit {
    Families: Families[];
    Products: Product[];
}

export interface Families extends RowFamily {
    KitFamily: KitFamily;
    SellPreference: Product | null;
}

export interface Pstatus extends RowPstatus {
    ProductPstatus: ProductPstatus;
}

export interface ProductPstatus {
    id: number;
    product_id: number;
    pstatus_id: number;
    created_at: Date | string;
    updated_at: Date | string;
}
