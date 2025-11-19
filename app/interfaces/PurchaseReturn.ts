export interface PurchaseReturn {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  purchase_control_product_id: number;
  returning_quantity: number;
  type: string;
  reason: string;
  warehouse: string;
  priority: boolean;
  invoice_issuance_date: Date;
  return_status: string;
  solicitation_number: number;
  returning_invoice_number: number;
  returning_invoice_date: Date;
  returning_invoice_value: string;
  packing_date: Date;
  collection_date_limit: Date;
  collection_date: Date;
  refund_status: string;
  refund_date: null;
  observation: string;
  supplier: string;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  PurchaseControlProduct: PurchaseControlProduct;
  User: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
}

export interface ProductsByInvoice {
  supplier: string;
  PurchaseControlProducts: PurchaseControlProduct[];
  invoice_issuance_date: string | null
}

export interface PurchaseControlProduct {
  id?: number;
  name: string;
  invoice: string;
  invoice_issuance_date?: Date;
  receiving_quantity?: number;
  description: string;
  created_at?: Date;
}

export interface Form {
  id: number | undefined;
  purchase_control_product_id: number | null;
  returning_quantity: number;
  type: string | null;
  reason: string;
  warehouse: string | null;
  priority: boolean;
  invoice_issuance_date: string | null;
  return_status: string;
  solicitation_number: number | null;
  returning_invoice_number: number | null;
  returning_invoice_date: string | null;
  returning_invoice_value: string;
  packing_date: string | null;
  collection_date_limit: string | null;
  collection_date: string | null;
  refund_status: string;
  refund_date: string | null;
  observation: string;
  supplier: string;
}
