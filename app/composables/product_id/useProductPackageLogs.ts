import type { Row } from "~/interfaces/PackageLogs";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useProductPackageLogs = (productId: string, options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/product/package-logs', {
        lazy,
        server,
        immediate,
        params: {
            product_id: productId,
        },
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Row[],
    }
}

