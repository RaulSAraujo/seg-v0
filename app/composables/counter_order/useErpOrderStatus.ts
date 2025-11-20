type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

interface OrderStatus {
    id: number;
    name: string;
}

export const useErpOrderStatus = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi<OrderStatus[]>('/counter-order/erp-order-status', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<OrderStatus[]>,
    }
}