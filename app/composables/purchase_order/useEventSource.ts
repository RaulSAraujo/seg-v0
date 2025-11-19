export function useEventSourcePurchaseControl() {

    const { token } = useAuth();

    const baseUrl = getBaseUrl();

    const loading = useLoadingIndicator();

    const eventSource = ref<EventSource>()

    const products = ref<{ name: string; icon: string }[]>([]);

    const setupEventSource = (filePath: string) => {
        eventSource.value = new EventSource(
            `${baseUrl}/purchase-control/update-order-by-xml?authorization=${token.value}&path=${filePath}`
        );

        eventSource.value.onmessage = handleEventSourceMessage

        eventSource.value!.onerror = () => {
            eventSource.value!.close();
        };
    }

    const handleEventSourceMessage = async (event: MessageEvent) => {
        const data = JSON.parse(event.data);

        if (data.name) {
            let icon = "";

            const isError =
                data.message.includes("Falha ao atualizar produto") ||
                data.message.includes("não encontrado") ||
                data.message.includes("XML anteriormente");
            if (isError) icon = "mdi-close-circle";

            const partial = data.message.includes("Quantidade Parcial");
            if (partial) icon = "mdi-progress-close";

            const full = data.message.includes("Quantidade Completa");
            if (full) icon = "mdi-check-circle";

            products.value.push({
                name: data.name,
                icon,
            });
        }

        if (data.message == "Importação XML finalizada") {
            $toast().success(data.message);

            loading.finish();
        }

        if (data.error) {
            $toast().error(data.error);
        }
    }

    return {
        setupEventSource,
        products,
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