export interface PAvailabilityHistory {
    id: number;
    availability_id: number;
    product_id: number;
    name: string;
    availability_at: Date;
    created_at: Date | string;
    updated_at: Date | string;
}