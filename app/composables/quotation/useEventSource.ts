export function useEventSource(filePath: string) {

    const { token } = useAuth();

    const baseUrl = getBaseUrl();

    const loading = useLoadingIndicator();

    const eventSource = ref<EventSource>()

    const setupEventSource = () => {
        eventSource.value = new EventSource(
            `${baseUrl}/quotation/second-step?authorization=${token.value}&path=${filePath}`
        );

        eventSource.value.onmessage = handleEventSourceMessage

        eventSource.value!.onerror = () => {
            eventSource.value!.close();
        };
    }

    const handleEventSourceMessage = async (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.message.length > 0) {
            $toast().info(data.message);
        }

        if (data.percentage) {
            loading.set(parseFloat(data.percentage));
        }

        if (data.message == "Importação finalizada") {
            loading.finish();

            eventSource.value!.close();
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