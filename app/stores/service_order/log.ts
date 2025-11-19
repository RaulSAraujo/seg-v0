import type { ServiceOrderStatusLog } from "~/interfaces/ServiceOrder";


export const useServiceOrderLogStore = defineStore("service_order_logs", () => {
    const logsData = ref<ServiceOrderStatusLog[]>([]);

    const set = (data: ServiceOrderStatusLog[]) => {
        logsData.value = data;
    }

    const clear = () => {
        logsData.value = [];
    }

    return {
        set,
        clear,
        logsData,
    };
})
