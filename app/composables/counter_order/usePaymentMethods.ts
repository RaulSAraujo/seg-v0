import type { PaymentsMethods } from "~/interfaces/CounterOrder";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const usePaymentMethods = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi<PaymentsMethods[]>('counter-order/payment-methods', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<PaymentsMethods[]>,
    }
}