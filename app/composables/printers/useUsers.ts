import type { Users } from "~/interfaces/User";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useUsers = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi<Users>('/user', {
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