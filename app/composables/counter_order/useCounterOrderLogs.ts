import type { Row } from "~/interfaces/CounterOrderLog";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useCounterOrderLogs = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi<Row[]>('/counter-order/logs', {
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
        data: data as unknown as Ref<Row[]>,
    }
}