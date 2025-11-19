import type { ServiceOrderService } from "~/interfaces/ServiceOrder";


export const useServiceOrderServicesStore = defineStore("service_order_services", () => {
    const serviceOrderServices = ref<ServiceOrderService[]>([]);

    const totalValueServices = computed(() =>
        serviceOrderServices.value?.reduce(
            (acc, curr) => acc + parseFloat(curr.service_value) * curr.quantity,
            0.0
        )
    );

    const set = (value: ServiceOrderService[]) => {
        serviceOrderServices.value = value;
    };

    const add = (product: ServiceOrderService) => {
        serviceOrderServices.value.push(product);
    };

    const remove = (index: number) => {
        serviceOrderServices.value.splice(index, 1);
    };

    const clear = () => {
        serviceOrderServices.value = [];
    };

    return {
        set,
        add,
        clear,
        fetch,
        remove,
        totalValueServices,
        serviceOrderServices,
    };
})