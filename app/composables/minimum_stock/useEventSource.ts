export function useEventSourceMinimumStock() {
    const { token } = useAuth();

    const baseUrl = getBaseUrl();

    const loading = useLoadingIndicator();

    const eventSource = ref<EventSource>()

    const setupEventSource = (filePath: string) => {
        eventSource.value = new EventSource(
            `${baseUrl}/minimum-stock/import-sales-average-and-months?authorization=${token.value}&path=${filePath}`
        );

        eventSource.value.onmessage = handleEventSourceMessage

        eventSource.value!.onerror = () => {
            eventSource.value!.close();
        };
    }

    const handleEventSourceMessage = async (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.percentage) {
            loading.set(parseFloat(data.percentage));
        }

        if (data.percentage == "100.00") {
            loading.finish();

            eventSource.value!.close();
        }

        if (data.error) {
            $toast().error(data.error);
        }
    }

    return {
        setupEventSource
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