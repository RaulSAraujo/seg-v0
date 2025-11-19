export interface ServiceOrderSchedule {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  service_order_id: number;
  technical_id: number;
  date: Date;
  start_time: string;
  end_time: string;
  weekday: string;
  observation: string;
  motive: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  title: string;
  all_day: boolean;
  ServiceOrder: ServiceOrder | null;
  User: User;
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
  model: string;
  serial_number: null | string;
  version: string;
  apparatus_value: string;
  apparatus_entry_at: Date;
  apparatus_delivery_at: Date | null;
  storage_location: null | string;
  resale: string;
  invoice: string;
  bought_at: Date | null;
  apparatus_collected: boolean;
  apparatus_condition: string;
  apparatus_category: string;
  accessories: string;
  extended_warranty: string;
  addtional_observation: null | string;
  print_observation: null | string;
  budget_status: null | string;
  responsible_technician: null;
  technician_erp_id: number | null;
  total_value_services: string;
  total_value_products: string;
  total_value: string;
  discount_value: string;
  serial_number_counter: number;
  reentry_status: "GREATER_THAN_90_DAYS" | "LESS_THAN_90_DAYS" | "NONE" | null;
  close_order_at: Date | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  Client: Client | null;
}

export interface Client {
  name: string;
  number1: string;
  number2: null | string;
  number3: null | string;
  ClientsAddresses: ClientAddress[];
}

export interface ClientAddress {
  id: number;
  client_id: number;
  zipcode: string;
  street: string;
  neighbourhood: string;
  complement: null | string;
  number: string;
  city: string;
  state: string;
  country: string;
  type: string;
  maps_location: null | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface User {
  id: number;
  name: string;
  active: boolean;
  is_admin: boolean;
  group_id: number;
}

export interface Event {
  title: string;
  start: Date;
  end: Date;
  technical: string;
  os: number;
  motive: string;
  observation: string;
  data: Row;
}
