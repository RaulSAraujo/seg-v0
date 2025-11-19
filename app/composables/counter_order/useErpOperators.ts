import type { ErpOperators } from "~/interfaces/ErpOperators";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useErpOperators = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = useFetch<ErpOperators[]>('/counter-order/counter-order-payments/erp-operators', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<ErpOperators[]>,
    }
}