/**
 * Obtém a URL base baseada no host
 */
function getBaseUrl() {
  const config = useRuntimeConfig();
  const req = useRequestHeaders(["host"]);
  const host = req.host || window.location.hostname;

  let baseURL = config.public.base_url_local as string;
  if (host.includes("ddns")) {
    baseURL = config.public.base_url_external as string;
  }

  return baseURL;
}

export const useQuotationStore = defineStore("quotation", () => {
  const eventSource = ref<EventSource | null>(null);
  const isProcessing = ref(false);
  const progress = ref(0);

  /**
   * Configura e inicia o EventSource para processamento de quotation
   */
  function setupEventSource(filePath: string) {
    const { token } = useAuth();
    const baseUrl = getBaseUrl();

    // Fecha EventSource anterior se existir
    if (eventSource.value) {
      eventSource.value.close();
    }

    isProcessing.value = true;
    progress.value = 0;

    eventSource.value = new EventSource(
      `${baseUrl}/quotation/second-step?authorization=${token.value}&path=${filePath}`
    );

    eventSource.value.onmessage = handleEventSourceMessage;

    eventSource.value.onerror = () => {
      eventSource.value?.close();
      isProcessing.value = false;
    };
  }

  /**
   * Manipula mensagens do EventSource
   */
  function handleEventSourceMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);

    if (data.message && data.message.length > 0) {
      $toast().info(data.message);
    }

    if (data.percentage !== undefined) {
      progress.value = parseFloat(data.percentage);
    }

    if (data.message === "Importação finalizada") {
      progress.value = 100;
      isProcessing.value = false;
      eventSource.value?.close();
      eventSource.value = null;
    }
  }

  /**
   * Fecha o EventSource e limpa o estado
   */
  function closeEventSource() {
    if (eventSource.value) {
      eventSource.value.close();
      eventSource.value = null;
    }
    isProcessing.value = false;
    progress.value = 0;
  }

  return {
    eventSource: readonly(eventSource),
    isProcessing: readonly(isProcessing),
    progress: readonly(progress),
    setupEventSource,
    closeEventSource,
  };
});

