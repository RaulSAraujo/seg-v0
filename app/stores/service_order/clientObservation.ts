import type { Observation } from "~/interfaces/ServiceOrder";


export const useServiceOrderClientObsStore = defineStore("service_order_client_observation", () => {
    const clientObservations = ref<Observation[]>([]);

    const set = (data: Observation[]) => {
        clientObservations.value = data;
    }

    const add = (data: Observation) => {
        clientObservations.value.splice(0, 0, data);
    }

    const update = (id: number, data: Observation) => {
        const { data: user } = useAuth()

        const index = useArrayFindIndex(clientObservations, (e) => e.id === id).value;

        clientObservations.value.splice(index, 1);

        setTimeout(() => {
            clientObservations.value.splice(index, 0, {
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
        const index = useArrayFindIndex(clientObservations, (e) => e.id === id).value;

        clientObservations.value.splice(index, 1);
    }

    const clear = () => {
        clientObservations.value = [];
    }

    return {
        clientObservations,
        set,
        add,
        update,
        remove,
        clear
    };
})
