export interface Users {
    rows: RowWithRelationship[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    name: string;
    username: string;
    password: string;
    active: boolean;
    is_admin: boolean;
    group_id: number;
    theme: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithRelationship extends Row {
    Group: Group;
    FavoriteRoutes: FavoriteRoute[];
}

export interface FavoriteRoute {
    id: number;
    user_id: number;
    name: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface Group {
    id: number;
    name: string;
    description: string;
    login_time_range: LoginTimeRange[];
    access_restriction: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    Operations: Operation[];
}

export interface Operation {
    id: number;
    resource: string;
    name: string;
    description: null | string;
    model: string;
    front_url: null | string;
    back_url: string;
    created_at: Date | null;
    updated_at: Date | null;
    hide_fields: null;
    hide_fields_list: null;
    deleted_at: null;
    GroupOperation: GroupOperation;
}

export interface GroupOperation {
    id: number;
    group_id: number;
    operation_id: number;
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
    day: string;
    selected: boolean;
    login_time: string;
    logout_time: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    active: boolean;
    is_admin: boolean;
    group_id: number;
    theme: boolean;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface Form {
    name: string;
    username: string;
    password: string | undefined;
    group_id: number | undefined;
    active: boolean
    is_admin: boolean
}