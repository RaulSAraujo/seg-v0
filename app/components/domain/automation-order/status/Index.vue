<script lang="ts" setup>
import type {
  Form,
  EventProgress,
} from "~/interfaces/AutomationOrderStatus";

const emit = defineEmits(["close", "snackbar"]);

const loading = ref(false);

const snackbar = useState<boolean>("active-confirmation", () => false);

const dialogProgress = useState<boolean>("active-dialog-progress", () => false);

const dataEvent = useState<EventProgress | null>("data-event", () => null);

const initSSE = (form: Form) => {
  loading.value = true;

  const { token } = useAuth();

  const req = useRequestHeaders(["host"]);

  const host = req.host || window.location.hostname;

  let baseURL = useNuxtApp().$config.public.base_url_local as string;
  if (host.includes("ddns")) {
    baseURL = useNuxtApp().$config.public.base_url_external as string;
  }

  const query = Object.entries(form).join("&").replaceAll(",", "=");

  const eventSource = new EventSource(
    `${baseURL}/order-automation/update-orders-by-status-with-romaneio?authorization=${token.value}&${query}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data) as EventProgress;

    if (data.status == "confirmation") {
      loading.value = false;

      emit("close");

      dataEvent.value = data;

      snackbar.value = true;
    }

    if (data.status == "progress") {
      dialogProgress.value = true;

      dataEvent.value = data;
    }

    if (data.status == "success") {
      dialogProgress.value = false;

      $toast().success(data.message);
    }

    if (data.status == "error" || data.status == "canceled") {
      loading.value = false;

      emit("close");

      $toast().error(data.message);
    }
  };

  eventSource.onerror = () => {
    loading.value = false;

    emit("close");

    eventSource.close();
  };
};
</script>

<template>
  <AutomationOrderStatusForm
    :loading="loading"
    @init="initSSE"
    @close="$emit('close')"
  />
</template>
