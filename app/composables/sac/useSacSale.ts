import type { RowWithRelations } from "~/interfaces/SacSale";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useSacSale = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { params } = useRoute()

    const { data, status, error, refresh, execute } = useFetch<RowWithRelations>(`/sac-sale/${params.id}`, {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<RowWithRelations>,
    }
}