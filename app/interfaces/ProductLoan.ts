export interface Productloan {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  user: number;
  name: string;
  description: string;
  reservation: string;
  quantity_reserved: number;
  observation: string;
  devolution: boolean;
  borrowed_to: string;
  devolution_at: Date | null;
  devolution_user_id: number | null;
  devolution_user_name: null | string;
  confirm_return: boolean;
  confirm_return_at: Date | null;
  confirm_return_user_id: number | null;
  confirm_return_user_name: null | string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  User: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  group_id: number;
  theme: boolean;
}
