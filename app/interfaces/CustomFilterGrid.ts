export interface CustomFilterGrid {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    attribute: string;
    type: string;
    label: string;
    length: number | null;
    model: string;
    association: null | string;
    item_value: null | string;
    item_name: null | string;
    layout_filters: LayoutFilters | null;
    fixed_values: FixedValue[] | null;
    active: boolean;
    external: boolean;
    align: string;
    sortable: boolean;
    width: number | null;
    initial_filter: boolean;
    initial_grid: boolean;
    sequence_filter: number | null;
    sequence_grid: number | null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
export interface FixedValue {
    text?: string;
    color?: string;
    title?: string;
    value?: number;
}

export interface LayoutFilters {
    size?: number;
    clearable?: boolean;
    range?: boolean;
    comboBox?: boolean;
    multiple?: boolean;
    approximate?: boolean;
    sizeCamp?: number;
}

export interface Form {
    model: string | undefined;
    label: string;
    type: string | undefined;
    attribute: string;
    align: string;
    width: number;
    sortable: boolean;
    active: boolean;
    association: string | undefined
    item_name: string;
    item_value: string;
    fixed_values: string
}