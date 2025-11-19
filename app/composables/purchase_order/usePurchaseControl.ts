import type { Row } from "~/interfaces/PurchaseControl";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const usePurchaseControl = (id: string, options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/purchase-control', {
        lazy,
        server,
        immediate,
        params: { id },
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<Row>,
    }
}