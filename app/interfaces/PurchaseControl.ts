import type { Row as PurchaseControlProduct } from "~/interfaces/PurchaseControlProduct";

export interface PurchaseControl {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  erp_order: string;
  supplier_order: string;
  description: string;
  buy_at: null;
  supplier: string;
  observation: string;
  user: string;
  created_at: Date;
  updated_at: Date;
  PurchaseControlProducts: PurchaseControlProduct[];
}

export interface Form {
  id?: number
  erp_order: string;
  supplier_order: string;
  description: string;
  supplier: string | null;
  observation: string;
}

export interface GlobalEdit {
  item: PurchaseControlProduct | null;
  active: boolean;
  x: number;
  y: number;
  type: string;
  attr: string;
  url: string;
  items?: { text: string }[];
  itemTitle?: string;
  itemValue?: string;
  newValue?: unknown;
  external?: boolean;
  save?: () => Promise<void>
  externalUpdateText?: boolean;
  updateText?: (value: string) => void
}

export interface GlobalEditEvent {
  type: string,
  attr: string,
  item: PurchaseControlProduct,
  items?: { text: string }[];
  itemTitle?: string;
  itemValue?: string;
  external?: boolean,
  save?: () => Promise<void>
  externalUpdateText?: boolean;
  updateText?: (value: string) => void
}