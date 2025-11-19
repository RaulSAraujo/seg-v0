export interface Group {
  rows: Row[];
  totalRecords: number;
  resultCount: number;
}

export interface Row {
  id: number;
  name: string;
  description: string;
  login_time_range: LoginTimeRange[];
  access_restriction: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
}

export interface LoginTimeRange {
  Friday: Day;
  Monday: Day;
  Tuesday: Day;
  Saturday: Day;
  Thursday: Day;
  Wednesday: Day;
}

export interface Day {
  day?: string;
  selected?: boolean;
  login_time: string;
  logout_time: string;
}

export interface GroupID {
  id: number;
  back_url: string;
  description: string;
  source_model: string;
  resource: string;
  methods: Method[];
  subpermissions: GroupID[];
}

export interface Method {
  id?: number;
  name: string;
  has_permission?: boolean;
  fake_method?: boolean;
  initial_value_permission?: boolean;
}

export interface NewPermissions {
  category: string;
  methods: Method[];
  pages: Pages[];
}

export interface Pages {
  page_name: string;
  routes: GroupID[];
  methods: Method[];
}

export interface NewArrayOrdering {
  page_name: string;
  category: string;
  route: GroupID;
}

export interface Form {
  name: string;
  description: string;
}
