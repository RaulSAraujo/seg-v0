import type { OthersData } from "~/interfaces/ServiceOrder";


export const useServiceOrderOthersStore = defineStore("service_order_others", () => {
    const initialOthersData = {
        reentry_status: null,
        apparatus_entry_at: null,
        storage_location: "",
        technician_erp_id: null,
        apparatus_collected: false,
        apparatus_delivery_at: null,
    };

    const othersData = ref<OthersData>({ ...initialOthersData });

    const set = (key: string, value: unknown) => {
        const { brDate } = useDateConversion();


        if (key in othersData.value) {
            if (key == "apparatus_entry_at") {
                ((othersData.value as unknown) as Record<string, unknown>)[key] = brDate(value as string) || null;

                return;
            }

            if (key == "apparatus_delivery_at") {
                ((othersData.value as unknown) as Record<string, unknown>)[key] = brDate(value as string) || null;

                return;
            }

            ((othersData.value as unknown) as Record<string, unknown>)[key] = value;
        }

    }

    const clear = () => {
        othersData.value = { ...initialOthersData };
    }

    return {
        set,
        clear,
        othersData,
    }
})