import type { CounterOrderInformationCentral } from '~/interfaces/CounterOrderInformationCenter'
type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useInformationCenter = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi<CounterOrderInformationCentral[]>('/counter-order/information-center', {
        lazy,
        server,
        immediate,
        query: { counter_order_id: useRoute().params.id },
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<CounterOrderInformationCentral[]>,
    }
}