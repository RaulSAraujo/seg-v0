import type { Row } from "~/interfaces/ServiceOrder";

export const useServiceOrderHistoryStore = defineStore("service_order_history", () => {
    const history = ref<Row[]>([]);

    const set = (row: Row[]) => {
        history.value = row;
    }

    const clear = () => {
        history.value = []
    }

    return {
        set,
        clear,
        history,
    }
})