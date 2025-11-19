import type { ResponseEventSource } from '~/interfaces/SalesOrderSeparation'

export function useEventSourceSalesOrdersSeparation() {

    const { token } = useAuth();

    const baseUrl = getBaseUrl();

    const eventSource = ref<EventSource>()

    const statusCount = ref<ResponseEventSource | null>(null);

    const setupEventSource = () => {
        eventSource.value = new EventSource(
            `${baseUrl}/sales-orders-separation/list-orders-event-stream?orders=false&authorization=${token.value}`
        );

        eventSource.value.onmessage = handleEventSourceMessage

        eventSource.value!.onerror = () => {
            eventSource.value!.close();
        };
    }

    const handleEventSourceMessage = async (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        statusCount.value = data;
    }

    return {
        setupEventSource,
        statusCount,
    }
}

const getBaseUrl = () => {
    const config = useRuntimeConfig();

    const req = useRequestHeaders(["host"]);

    const host = req.host || (process.client && typeof window !== 'undefined' ? window.location.hostname : '');

    let baseURL = config.public.base_url_local as string;
    if (host.includes("ddns")) {
        baseURL = config.public.base_url_external as string;
    }

    return baseURL;
};