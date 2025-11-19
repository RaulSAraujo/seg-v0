<script lang="ts" setup>
import { generatePdfCashDropApi } from "~/services/cash-control.service";

defineOptions({
  name: "CashControlCloseAlert",
});

const { $config } = useNuxtApp();
const loading = useLoadingIndicator();

const currentTime = ref(0);
const snackbar = useState<boolean>("active-close-cash-control", () => false);

const save = async () => {
  try {
    snackbar.value = false;

    loading.start();

    const { url } = await generatePdfCashDropApi();

    window?.open(`${$config.public.base_url_local}${url}`, "_blank");
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  } finally {
    loading.finish();
  }
};
</script>

<template>
  <v-snackbar
    v-model="snackbar"
    rounded="lg"
    timeout="6000"
    :timer="`${currentTime}`"
    variant="flat"
    color="blue"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Deseja fechar o caixa ?</div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="save()"> Sim </v-btn>
    </template>
  </v-snackbar>
</template>
