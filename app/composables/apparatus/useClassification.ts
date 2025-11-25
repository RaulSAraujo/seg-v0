import type { ClassificationApparatus } from "~/interfaces/ClassificationApparatus";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useClassificationApparatus = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi<ClassificationApparatus>('/apparatus/classification-apparatus', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        data: data,
        error: readonly(error),
        status: readonly(status),
    }
}