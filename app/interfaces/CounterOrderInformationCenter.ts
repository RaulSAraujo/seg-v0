import type { User } from '~/interfaces/User'

export interface CounterOrderInformationCentral {
    id: number;
    counter_order_id: number;
    user_id: number;
    description: string;
    created_at: string;
    updated_at: string;
    User: User;
}

export interface Response {
    message: string;
    success: boolean;
    result: CounterOrderInformationCentral[];
}
