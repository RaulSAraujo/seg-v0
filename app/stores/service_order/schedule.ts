import type { ServiceOrderSchedules } from "~/interfaces/ServiceOrder";

export const useServiceOrderScheduleStore = defineStore("service_order_schedule", () => {
    const serviceOrderSchedules = ref<ServiceOrderSchedules[]>([]);

    const set = (data: ServiceOrderSchedules[]) => {
        serviceOrderSchedules.value = data;
    }

    const add = (data: ServiceOrderSchedules) => {
        serviceOrderSchedules.value.splice(0, 0, data);
    }

    const remove = (id: number) => {
        const index = useArrayFindIndex(serviceOrderSchedules, (e) => e.id === id).value;

        serviceOrderSchedules.value.splice(index, 1);
    }

    const clear = () => {
        serviceOrderSchedules.value = [];
    }

    return {
        serviceOrderSchedules,
        set,
        add,
        remove,
        clear
    };
})
