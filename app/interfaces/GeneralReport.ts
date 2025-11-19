export interface GeneralReport {
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
    user_active: null;
    user_active_at: null;
    defect_description: string;
    solution_description: string;
    apparatus: string;
    model: string;
    serial_number: string;
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
    accessories: string;
    extended_warranty: string;
    addtional_observation: string;
    print_observation: string;
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
    Client: Client;
    city?: string;
}

export interface Client {
    id: number;
    erp_client_id: number;
    cpf_cnpj: string;
    identity_number: null | string;
    name: string;
    born_date: Date | null;
    type: boolean;
    flag_client: number;
    email: null | string;
    official_email: null;
    validated_email: boolean;
    number1: string;
    identifier_number1: string;
    number2: null | string;
    identifier_number2: string;
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
    maps_location: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}
