import type { Row as User } from "~/interfaces/User";
import type { RowWithAddress as Client } from "~/interfaces/Client";
import type { Row as CounterOrderLog } from '~/interfaces/CounterOrderLog';

export interface CounterOrder {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  erp_counter_order_id: number;
  user_id: number;
  client_id: number;
  total_value: string;
  status: string;
  attendance_type: string;
  discount: string;
  observation: string;
  created_at: Date;
  updated_at: Date;
  budget_status: string;
  delivery_date: Date;
  User: User;
  Client: Client;
  CounterOrderLogs: CounterOrderLog[];
  CounterOrderPayments: CounterOrderPayment[];
  CounterOrderProducts: CounterOrderProduct[];
}

export interface CounterOrderPayment {
  id?: number;
  counter_order_id?: number;
  erp_payment_id?: number;
  payments_methods_id: number | null;
  cpf_cnpj: string;
  payment_value: string;
  operator_id: number | null;
  bank_id: number | null;
  account_id: string | null;
  authorization: string;
  effective_date: Date | string | null;
  created_at?: Date;
  updated_at?: Date;
  erp_operator_name: string;
  erp_payment_name: string;
}

export interface CounterOrderProduct {
  id?: number;
  counter_order_id?: number;
  erp_counter_order_product_id?: number;
  erp_product_id: number;
  produto_chave: number;
  name: string;
  quantity: number;
  counter_price: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface FormFindProduct {
  id?: string;
  name?: string;
  description?: string;
}

export interface FormPayment {
  payments_methods_id: number | null;
  payment_value: string;
  effective_date: string | null;
  authorization: string;
}

export interface PaymentsMethods {
  id: number;
  name: string;
}

export interface Form {
  status: string;
  attendance_type: string | null;
  seller: string;
  created_at: string;
  delivery_date: string;
  budget_status: string | null;
  discount: number;
}