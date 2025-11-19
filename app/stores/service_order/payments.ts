import type { ServiceOrderPayment } from "~/interfaces/ServiceOrder";

export const useServiceOrderPaymentsStore = defineStore("service_order_payments", () => {
    const serviceOrderPayments = ref<ServiceOrderPayment[]>([]);

    const set = (data: ServiceOrderPayment[]) => {
        serviceOrderPayments.value = data;
    }

    const add = (data: ServiceOrderPayment) => {
        serviceOrderPayments.value.splice(0, 0, data);
    }
    const remove = (id: number) => {
        const index = useArrayFindIndex(serviceOrderPayments, (e) => e.id === id).value;

        serviceOrderPayments.value.splice(index, 1);
    }

    const clear = () => {
        serviceOrderPayments.value = [];
    }

    return {
        serviceOrderPayments,
        set,
        add,
        remove,
        clear
    };
})
