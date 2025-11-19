export interface PartsCollectionManagement {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  service_order_id: number;
  end_date_os: Date;
  os_supplier: string;
  collection_date_os: Date;
  brand: string;
  apparatus: string;
  model: string;
  version: string;
  serial_number: string;
  inches_apparatus: number | null;
  defect: string;
  solution: string;
  name: string;
  description: string;
  quantity: number;
  type_warranty: string;
  warranty_supplier: string;
  used: boolean;
  recoverable: boolean;
  recovered_part: string;
  observation: string;
  storage_location: string;
  warehouse_delivery_date: Date | null;
  limit_date_storage: Date;
  return_invoice: number | null;
  status: string;
  new_os: null;
  requested_collection_date: string | null;
  final_date: null;
  completion_deadline: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  ServiceOrder: ServiceOrder;
}

export interface ServiceOrder {
  id: number;
  user: number;
  erp_client_id: number;
  os_supplier: string;
  supplier: string;
  region: string;
  type: number;
  service_mode: string;
  status: number;
  user_active: null;
  user_active_at: null;
  defect_description: string;
  solution_description: string;
  apparatus: string;
  apparatus_category: null | string;
  model: string;
  serial_number: string;
  version: string;
  apparatus_value: string;
  apparatus_entry_at: Date;
  apparatus_delivery_at: Date;
  storage_location: null | string;
  resale: string;
  invoice: string;
  bought_at: Date | null;
  apparatus_collected: boolean;
  apparatus_condition: string;
  accessories: string;
  extended_warranty: string;
  addtional_observation: null;
  print_observation: null;
  budget_status: null | string;
  responsible_technician: null;
  technician_erp_id: number | null;
  total_value_services: string;
  total_value_products: string;
  total_value: string;
  discount_value: string;
  serial_number_counter: number;
  reentry_status: "GREATER_THAN_90_DAYS" | "LESS_THAN_90_DAYS" | "NONE" | null;
  close_order_at: Date;
  created_at: Date;
  updated_at: Date;
  ServiceOrderProducts: ServiceOrderProduct[];
}

export interface ServiceOrderProduct {
  id: number;
  service_order_id: number;
  name: string;
  produto_chave: string;
  ean: string;
  erp_product_id: string;
  description: string;
  quantity: number;
  availability: boolean;
  availability_at: null;
  forecast_days: number;
  cost: string;
  product_value: string;
  erp_reserve_id: number | null;
  reserved: number;
  bought: boolean;
  bought_at: null;
  created_at: Date;
  updated_at: Date;
}

export interface Form {
  service_order_id: number | null;
  os_supplier: string;
  end_date_os: string;
  collection_date_os: string;
  name: string;
  description: string;
  quantity: number;
  apparatus: string;
  model: string;
  serial_number: string;
  version: string;
  brand: string;
  type_warranty: string;
  warranty_supplier: string;
  used: boolean;
  recoverable: boolean;
  recovered_part: string;
  observation: string;
  warehouse_delivery_date: string | null;
  limit_date_storage: string;
  return_invoice: string | null;
  status: string | undefined;
  final_date: string | null;
  completion_deadline: string | null;
  storage_location: string;
  type: number | null;
  inches_apparatus: string | null;
  requested_collection_date: string | null;
  defect: string;
  solution: string;
}
