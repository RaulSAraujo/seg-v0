type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useWarrantyAccounts = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/warranty/accounts', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as string[],
    }
}