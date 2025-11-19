export interface SalesOrderSeparation {
  rows: RowWithRelations[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  sale_id_erp: string;
  sale_id_ecom: string;
  indication: string;
  type_destination_erp: string;
  company: string;
  warehouse: string;
  validation_required: null;
  validated: boolean;
  validate_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface RowWithRelations extends Row {
  SalesOrdersProductsSeparations: SalesOrdersProductsSeparation[];
}

export interface SalesOrdersProductsSeparation {
  id: number;
  sales_orders_separation_id: number;
  erp_product_id: number;
  name: string;
  brand: string;
  sold_quantity: number;
  cost: string;
  price_order: string;
  price_erp: string;
  gross_margin_order: string;
  gross_margin_erp: string;
  is_promotion: boolean;
  type_destination_erp: string;
  sending_limit_at: null;
  validation_required: null;
  validated: boolean;
  validate_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface ResponseEventSource {
  pre_process: number;
  ZE: number;
  ZN: number;
  ZP: number;
  ZQ: number;
}