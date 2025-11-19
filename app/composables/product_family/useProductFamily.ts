import type { Product } from "~/interfaces/Family";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useProductFamily = (id: string, options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/product/family', {
        lazy,
        server,
        immediate,
        query: { id },
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<Product[]>,
    }
}

