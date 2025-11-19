export interface ServiceOrder {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  user: number;
  erp_client_id: number;
  os_supplier: string;
  supplier: string;
  region: string;
  type: number;
  service_mode: string;
  status: number;
  user_active: number;
  user_active_at: Date;
  defect_description: string;
  solution_description: string;
  apparatus: string;
  model: string;
  serial_number: null;
  version: string;
  apparatus_value: string;
  apparatus_entry_at: Date;
  apparatus_delivery_at: Date;
  storage_location: null;
  resale: string;
  invoice: string;
  bought_at: null;
  apparatus_collected: boolean;
  apparatus_condition: string;
  accessories: string;
  extended_warranty: string;
  addtional_observation: string;
  print_observation: null;
  budget_status: null;
  responsible_technician: null;
  technician_erp_id: null;
  total_value_services: string;
  total_value_products: string;
  total_value: string;
  discount_value: string;
  serial_number_counter: number;
  reentry_status: "GREATER_THAN_90_DAYS" | "LESS_THAN_90_DAYS" | "NONE" | null;
  close_order_at: null;
  created_at: Date;
  updated_at: Date;
  open_orders: { service_order_id: number }[];
  ServiceOrderProducts: ServiceOrderProduct[];
  ServiceOrderServices: ServiceOrderService[];
  Client: Client;
}

export interface Client {
  id: number;
  erp_client_id: number;
  cpf_cnpj: null | string;
  identity_number: null | string;
  name: string;
  born_date: Date | null;
  type: boolean | null;
  flag_client: number;
  email: null | string;
  official_email: null;
  validated_email: boolean;
  number1: string;
  identifier_number1: null | string;
  number2: null | string;
  identifier_number2: null | string;
  number3: null | string;
  identifier_number3: null | string;
  phone_mercado_pago: null;
  gender: null | string;
  observation: null | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  ClientsAddresses: ClientAddress[];
}

export interface ClientAddress {
  id: number;
  client_id: number;
  zipcode: string;
  street: string;
  neighbourhood: string;
  complement: string;
  number: string;
  city: string;
  state: string;
  country: string;
  type: null | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface Observation {
  id: number;
  service_order_id: number;
  description: string;
  user: number;
  hidden_comment: boolean;
  comment_change: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  User: User;
  target_group?: string;
  status?: boolean;
}

export interface InternalObservations {
  id: number;
  service_order_id: number;
  observation: string;
  user: number;
  created_at: Date;
  updated_at: Date;
  audit_status: null | string;
  audit_date: Date | null;
  User: User;
  target_user: string;
  status: string;
  products: string;
  validated: boolean;
  is_manual: boolean;
}

export interface InternalObservationsForm {
  target_user: string | null;
  status: string | null;
  observation: string | null;
  is_manual?: boolean;
  products?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  group_id: number;
  theme: boolean;
}

export interface ServiceOrderPayment {
  id: number;
  service_order_id: number;
  erp_id: number;
  cpf_cnpj: string;
  erp_payment_id: number;
  erp_payment_name?: string;
  payment_value: string;
  operator_id: number;
  erp_operator_name?: string;
  bank_id: number;
  account_id: number;
  authorization: string;
  effective_date: Date;
  created_at: Date;
  updated_at: Date;
  ErpOperators: ErpOperators[];
  ErpPaymentsMethods: ErpPayments[];
}

export interface ServiceOrderPaymentForm {
  erp_payment_id: number | null;
  payment_value: string;
  effective_date: string | null;
  authorization: string;
  operator_id?: number;
  bank_id?: number;
  account_id?: string;
}

export interface ErpPayments {
  id: number;
  payment: string;
  erp_payment_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: null;
}

export interface ErpOperators {
  id: number;
  name: string;
  erp_operator_id: number;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: null;
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
  deleted_at: null;
}

export interface ServiceOrderProductForm {
  name?: string;
  produto_chave?: string;
  model?: string;
  description?: string;
}

export interface ServiceOrderService {
  id: number;
  service_order_id: number;
  erp_service: number;
  quantity: number;
  service_value: string;
  service_description: string;
  complete_service: null;
  commission_percentage: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface ServiceOrderServiceForm {
  service: {
    SERVICO: string;
    DESCRSERV: string;
  } | null;
  quantity: number;
  service_value: string;
}

export interface ServiceOrderStatusLog {
  id: number;
  service_order_id: number;
  log_description: string;
  initial_status: string;
  final_status: string;
  user: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  User: User;
}

export interface ServiceOrderSchedules {
  id: number;
  title: string;
  service_order_id: number;
  technical_id: number;
  technical_name?: string;
  date: Date;
  start_time: string;
  end_time: string;
  weekday: string;
  observation: null;
  motive: string;
  all_day: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  User: User;
}

export interface ServiceOrderSchedulesForm {
  technical_id: number | null;
  date: string | null;
  weekday: string;
  observation: string;
  motive: string;
}

export interface ClientData {
  id?: number | undefined
  erp_client_id?: number | undefined
  name: string;
  gender: string | null;
  type: boolean | null;
  cpf_cnpj?: string;
  identity_number?: string | null;
  born_date?: string | null;
  email?: string;
  number1: string;
  identifier_number1?: string | null;
  number2?: string | null;
  identifier_number2?: string | null;
  number3?: string | null;
  identifier_number3?: string | null;
  flag_client?: number;
  observation?: string;
}

export interface AddressData {
  zipcode: string;
  street: string;
  neighbourhood: string;
  city: string;
  state: string;
  complement?: string;
  number?: string;
  observation?: string;
  type?: string;
  country?: string;
  maps_location?: string;
}

export interface ApparatusData {
  supplier: string | null;
  apparatus: string | null;
  model: string | null;
  serial_number?: string;
  version?: string;
  defect_description: string;
  apparatus_condition: string;
  accessories?: string;
  additional_observation?: string;
}

export interface InvoiceData {
  resale: string;
  invoice: string;
  bought_at: string | null;
  apparatus_value: string | number;
  extended_warranty: string;
}

export interface OthersData {
  reentry_status: "GREATER_THAN_90_DAYS" | "LESS_THAN_90_DAYS" | "NONE" | null;
  apparatus_entry_at: Date | string | null;
  storage_location: string;
  technician_erp_id: number | null;
  apparatus_collected: boolean;
  apparatus_delivery_at: Date | string | null;
}

export interface AddUserActive {
  result: Array<number | string>;
  message: string;
  user_active: number;
  user_name: string;
  time_active: string;
  limit_time: number;
  success: boolean;
  status: number;
}

export interface ServiceOrderData {
  id: string;
  type: string | number | null;
  service_mode: string | null;
  status: string | number | null;
  os_supplier: string;
  solution_description: string;
  total_value_services: string;
  total_value_products: string;
  total_value: string;
  discount_value: string | undefined;
  supplier: string | null;
  apparatus: string | null;
  model: string | null;
  serial_number?: string | undefined;
  version?: string | undefined;
  defect_description: string;
  apparatus_condition: string;
  accessories?: string | undefined;
  additional_observation?: string | undefined;
  reentry_status: "GREATER_THAN_90_DAYS" | "LESS_THAN_90_DAYS" | "NONE" | null;
  apparatus_entry_at: Date | string | null;
  storage_location: string;
  technician_erp_id: number | null;
  apparatus_collected: boolean;
  apparatus_delivery_at: Date | string | null;
  resale: string;
  invoice: string;
  bought_at: string | null;
  apparatus_value: string | number;
  extended_warranty: string;
}

export interface ServiceOrderResponse {
  result: Array<number | string>;
  message: string;
  success: boolean;
  service_order: Row;
  status_log: ServiceOrderStatusLog[];
}

export interface OctadeskMessage {
  message: string;
  type: string;
  label: string;
}

