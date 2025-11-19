type Options = {
    lazy?: boolean
    server?: boolean
    immediate?: boolean
}

interface AttendanceType {
    id: number;
    name: string;
}


export const useAttendanceType = (options: Options) => {
    const { server = true, immediate = true, lazy = false } = options

    const { data, status, error, refresh, execute } = $api<AttendanceType[]>('counter-order/attendance-type', {
        lazy,
        server,
        immediate,
    });

    return {
        refresh,
        execute,
        error: readonly(error),
        status: readonly(status),
        data: data as unknown as Ref<AttendanceType[]>,
    }
}