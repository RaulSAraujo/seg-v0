import type { Row as ClassificationApparatu } from '~/interfaces/ClassificationApparatus'

export interface Apparatus {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    erp_id: number;
    apparatus_name: string;
    classification_apparatus_id: number | null;
    created_at: Date;
    updated_at: Date;
    ClassificationApparatu: ClassificationApparatu | null;
}

export interface Form {
    apparatus_name: string;
    classification_apparatus_id: number | null;
}