type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}


export const useErpSituationApi = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi("/erp/situation", {
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