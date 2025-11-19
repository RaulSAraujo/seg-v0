import type { Row } from "~/interfaces/ServiceOrder";

export const useServiceOrderStore = defineStore("service_order", () => {
    const service_mode = ref<string | null>(null);

    const type = ref<string | number | null>(null);

    const status = ref<string | number | null>(null);

    const os_supplier = ref<string>("");

    const openOrders = ref<{ service_order_id: number }[]>([]);

    const discountValue = ref<string | undefined>("");

    const budgetStatus = ref<string | null>(null);

    const solutionDescription = ref<string>("");

    const loadingProps = async (order: Row) => {
        type.value = order.type;

        status.value = order.status;

        os_supplier.value = order.os_supplier;

        service_mode.value = order.service_mode;

        budgetStatus.value = order.budget_status;

        openOrders.value = order.open_orders ?? [];

        discountValue.value = order.discount_value;

        solutionDescription.value = order.solution_description;
    };

    const clear = () => {
        service_mode.value = null;

        type.value = null;

        status.value = null;

        os_supplier.value = "";

        discountValue.value = "";

        budgetStatus.value = null;

        solutionDescription.value = "";
    };

    return {
        type,
        clear,
        status,
        openOrders,
        os_supplier,
        service_mode,
        loadingProps,
        budgetStatus,
        discountValue,
        solutionDescription,
    };
});
