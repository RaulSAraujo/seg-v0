import type { Row } from "~/interfaces/Package";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useClassificationApparatus = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/apparatus/classification', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Row[],
    }
}