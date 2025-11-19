import type { CounterOrderInformationCentral } from '~/interfaces/CounterOrderInformationCenter'

export const useCounterOrderInfCenterStore = defineStore("counter_order_information_center", () => {
    const informationCenter = ref<CounterOrderInformationCentral[]>([]);

    const set = (data: CounterOrderInformationCentral[]) => {
        informationCenter.value = data;
    }

    const add = (data: CounterOrderInformationCentral) => {
        informationCenter.value.splice(0, 0, data);
    }

    const update = (id: number, data: CounterOrderInformationCentral) => {
        const { data: user } = useAuth()

        const index = useArrayFindIndex(informationCenter, (e) => e.id === id).value;

        informationCenter.value.splice(index, 1);

        setTimeout(() => {
            informationCenter.value.splice(index, 0, {
                ...data,
                User: {
                    id: user.value!.id,
                    group_id: user.value!.groupId,
                    name: user.value!.name,
                    theme: user.value!.theme,
                    username: user.value!.username,
                    active: false,
                    is_admin: false,
                    created_at: new Date(),
                    updated_at: new Date()
                },
            });
        }, 100);
    }

    const remove = (id: number) => {
        const index = useArrayFindIndex(informationCenter, (e) => e.id === id).value;

        informationCenter.value.splice(index, 1);
    }

    const clear = () => {
        informationCenter.value = [];
    }

    return {
        informationCenter,
        set,
        add,
        update,
        remove,
        clear
    };
})
