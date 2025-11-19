<script lang="ts" setup>
import type { EventProgress } from "~/interfaces/AutomationOrderStatus";

useHead({
  titleTemplate: `Automações de pedido - %s`,
});

definePageMeta({
  path: "/automacoes-pedido",
});

const dialog = ref(false);

const snackbar = useState<boolean>("active-confirmation", () => false);

const dialogProgress = useState<boolean>("active-dialog-progress", () => false);

const dataEvent = useState<EventProgress | null>("data-event", () => null);
</script>

<template>
  <v-container class="mt-4">
    <AutomationOrderInitiatorButton @open="dialog = true" />

    <AutomationOrderDialog v-model="dialog" @close="dialog = false" />

    <AutomationOrderStatusConfirmation
      v-model="snackbar"
      :data-event-progress="dataEvent"
      @close="snackbar = false"
    />

    <AutomationOrderStatusDialogProgress
      v-model="dialogProgress"
      :progress="dataEvent?.percentage ?? '0'"
    />

    <AutomationOrderForceSyncPrompt />
  </v-container>
</template>
