export interface City {
    rows: Row[];
    totalRecords: number;
    resultCount: number;
}

export interface Row {
    id: number;
    city: string;
    state: string;
    cep: string;
    region_id: number;
    created_at: Date | null;
    updated_at: Date | null;
    Region: Region;
}

export interface Region {
    id: number;
    region: string;
    color: string;
    created_at: Date | null;
    updated_at: Date | null;
}


export interface Form {
    city: string;
    state: string;
    cep: string;
    region_id: number | undefined;
  }