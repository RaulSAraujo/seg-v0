type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useGetPaymentTypes = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = useFetch<{ values: string[] }>('/sac-sale/get-payment-types', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<{ values: string[] }>,
    }
}