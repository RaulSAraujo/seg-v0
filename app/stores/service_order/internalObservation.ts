import type { InternalObservations } from "~/interfaces/ServiceOrder";

export const useServiceOrderInternalObsStore = defineStore("service_order_internal_observation", () => {
    const internalObservations = ref<InternalObservations[]>([]);

    const set = (data: InternalObservations[]) => {
        internalObservations.value = data;
    }

    const add = (data: InternalObservations) => {
        internalObservations.value.splice(0, 0, data);
    }

    const remove = (id: number) => {
        const index = useArrayFindIndex(internalObservations, (e) => e.id === id).value;

        internalObservations.value.splice(index, 1);
    }

    const find = (name: string) => {
        const find = useArrayFindLast(
            internalObservations,
            (e) => e.is_manual == false && e.products == name
        );

        return find.value
    }

    const clear = () => {
        internalObservations.value = [];
    }

    return {
        internalObservations,
        set,
        add,
        remove,
        find,
        clear
    };
})
