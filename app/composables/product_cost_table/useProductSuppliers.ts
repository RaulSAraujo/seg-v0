import type { Supplier } from "~/interfaces/Supplier";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useProductSuppliers = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi<Supplier>('/product/supplier', {
        key: "supplier",
        lazy,
        server,
        immediate,
        getCachedData: (key, nuxtApp) => (nuxtApp.payload.data[key] || nuxtApp.static.data[key])
    });

    return {
        refresh,
        execute,
        data: data,
        error: readonly(error),
        status: readonly(status),
    }
}

