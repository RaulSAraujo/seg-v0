import type { Row, } from "~/interfaces/SupplierPasswordsLogs";

type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

export const useSupplierPasswordLogs = (id: string, options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $useApi('/supplier-passwords/supplier-passwords-logs', {
        lazy,
        server,
        immediate,
        params: { supplier_passwords_id: id },
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Row[],
    }
}