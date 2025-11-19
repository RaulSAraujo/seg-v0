import type { RowWithRelationship } from "~/interfaces/Warranty";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useWarrantyById = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/warranty', {
        lazy,
        server,
        immediate,
        query: { id: useRoute().params.id },
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<RowWithRelationship>,
    }
}