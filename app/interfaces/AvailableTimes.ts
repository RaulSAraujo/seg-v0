export interface AvailableTimes {
    technical_id: string;
    technical: string;
    availables: Available[];
}

export interface Available {
    end_time: string;
    start_time: string;
}
