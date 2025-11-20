import type { Row } from "~/interfaces/CounterOrder";

type Options = {
  lazy?: boolean
  server?: boolean
  immediate?: boolean
}

export const useCounterOrderById = (options: Options) => {
  const { server = true, immediate = true, lazy = false } = options

  const { data, status, error, refresh, execute } = $useApi<Row>(`/counter-order/${useRoute().params.id}`, {
    lazy,
    server,
    immediate,
  });

  return {
    refresh,
    execute,
    error: readonly(error),
    status: readonly(status),
    data: data as unknown as Ref<Row>,
  }
}