import type { Row as RowProduct } from './Product'
import type { Row as RowSupplier } from './Supplier'
import type { Row as RowQuotation } from './Quotation'

export interface Family {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    buy_preference_id: number | null;
    product_id: number | null;
    quantity: null;
    model: null;
    replace_cost: null;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithRelationship extends Row {
    Products: Product[];
    SellPreference: Product | null;
}

export interface Product extends RowProduct {
    Quotations?: RowQuotation[] & { Supplier: RowSupplier }[];
    SupplierPreference?: RowSupplier;
}