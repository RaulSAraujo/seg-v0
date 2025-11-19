import type { Row } from "~/interfaces/Package";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useProductPackages = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/product/package', {
        key: "package",
        lazy,
        server,
        immediate,
        getCachedData: (key, nuxtApp) => (nuxtApp.payload.data[key] || nuxtApp.static.data[key])
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<Row[]>,
    }
}

