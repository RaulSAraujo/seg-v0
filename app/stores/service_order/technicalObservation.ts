import type { Observation } from "~/interfaces/ServiceOrder";


export const useServiceOrderTechObsStore = defineStore("service_order_technical_observation", () => {
    const technicalObservations = ref<Observation[]>([]);

    const add = (data: Observation) => {
        technicalObservations.value.splice(0, 0, data);
    }

    const update = (id: number, data: Observation) => {
        const { data: user } = useAuth()

        const index = useArrayFindIndex(technicalObservations, (e) => e.id === id).value;

        technicalObservations.value.splice(index, 1);

        setTimeout(() => {
            technicalObservations.value.splice(index, 0, {
                ...data,
                User: {
                    id: user.value!.id,
                    group_id: user.value!.groupId,
                    name: user.value!.name,
                    theme: user.value!.theme,
                    username: user.value!.username,
                },
            });
        }, 100);
    }

    const remove = (id: number) => {
        const index = useArrayFindIndex(technicalObservations, (e) => e.id === id).value;

        technicalObservations.value.splice(index, 1);
    }

    const clear = () => {
        technicalObservations.value = [];
    }

    return {
        technicalObservations,
        add,
        update,
        remove,
        clear
    };
})
