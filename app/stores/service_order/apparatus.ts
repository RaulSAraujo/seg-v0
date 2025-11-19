import type { ApparatusData } from "~/interfaces/ServiceOrder";

export const useServiceOrderApparatusStore = defineStore("service_order_apparatus", () => {
    const initialApparatusData = {
        supplier: null,
        apparatus: null,
        model: null,
        serial_number: "",
        version: "",
        defect_description: "",
        apparatus_condition: "",
        accessories: "",
        additional_observation: "",
    };

    const apparatusData = ref<ApparatusData>({ ...initialApparatusData });

    const errorsApparatusData = ref({});

    const set = (key: string, value: unknown) => {
        if (key in apparatusData.value) {
            ((apparatusData.value as unknown) as Record<string, unknown>)[key] = value;
        }
    }

    const clear = () => {
        errorsApparatusData.value = {};
        apparatusData.value = { ...initialApparatusData };
    }

    return {
        set,
        clear,
        apparatusData,
        errorsApparatusData,
    };
})
