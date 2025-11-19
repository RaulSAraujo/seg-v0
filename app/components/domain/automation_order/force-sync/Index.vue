<script lang="ts" setup>
const emit = defineEmits(["close"]);

const loading = ref(false);

const dialog = useState<boolean>("active-prompt", () => false);

const mensagens = useState<string[]>("force-sync-mensagens", () => []);

const initSSE = () => {
  loading.value = true;

  mensagens.value = [];

  const { token } = useAuth();

  const req = useRequestHeaders(["host"]);

  const host = req.host || window.location.hostname;

  let baseURL = useNuxtApp().$config.public.base_url_local as string;
  if (host.includes("ddns")) {
    baseURL = useNuxtApp().$config.public.base_url_external as string;
  }

  const eventSource = new EventSource(
    `${baseURL}/order-automation/force-sync-orders-tax-data?authorization=${token.value}`
  );

  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);

    mensagens.value.push(data);
  };

  eventSource.onerror = () => {
    loading.value = false;

    $toast().info("Não há mais pedidos para serem processados.");

    eventSource.close();

    emit("close");

    dialog.value = true;
  };
};
</script>

<template>
  <div class="mt-2 d-flex justify-end">
    <v-btn
      class="mr-2"
      base-color="grey"
      text="CANCELAR"
      variant="outlined"
      @click="$emit('close')"
    />

    <v-btn base-color="primary" text="INICIAR" :loading="loading" @click="initSSE" />
  </div>
</template>
