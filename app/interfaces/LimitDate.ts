import type { Row as User } from '~/interfaces/User'

export interface LimitDate {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    brand: string;
    warning_days: number;
    created_at: Date;
    updated_at: Date;
}

export interface RowWithUser extends Row {
    User: User;
}

export interface Form {
    warning_days: number;
    brand: string | undefined;
}
