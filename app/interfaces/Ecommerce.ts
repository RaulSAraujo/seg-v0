export interface Ecommerce {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  web_ecommerce_id: number;
  erp_ecommerce_id: number;
  price_percentage: string;
  profit_margin: string;
  virtual_stock: boolean;
  consumer_key: null | string;
  consumer_secret: null | string;
  code: null | string;
  url: null | string;
  name: string;
  information_source: boolean;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Form {
  id?: number;
  web_ecommerce_id: number | null;
  erp_ecommerce_id: number | null;
  price_percentage: string;
  profit_margin: string;
  virtual_stock: boolean;
  consumer_key: null | string;
  consumer_secret: null | string;
  code: null | string;
  url: null | string;
  name: string;
  information_source: boolean;
  active: boolean;
}
