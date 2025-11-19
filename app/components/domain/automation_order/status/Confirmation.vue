<script lang="ts" setup>
import type { EventProgress } from "~/interfaces/AutomationOrderStatus";

const props = defineProps<{
  dataEventProgress: EventProgress | null;
}>();

const emit = defineEmits(["close"]);

const currentTime = ref(0);

const { $customFetch } = useNuxtApp();

const confirmOrdersUpdate = (event: boolean) => {
  try {
    emit("close");

    $customFetch("order-automation/confirm-orders-update", {
      method: "POST",
      body: {
        confirmation_id: props.dataEventProgress?.confirmation_id,
        is_confirmed: event,
      },
    });
  } catch (error) {
    const err = error as { statusText: string; message: string };

    $toast().error(`${err.statusText ?? err.message}`);
  }
};
</script>

<template>
  <v-snackbar
    rounded="lg"
    timeout="30000"
    :timer="`${currentTime}`"
    variant="flat"
    color="primary"
    location="top"
    content-class="border-thin"
  >
    <div class="text-subtitle-1">Confirmação</div>

    <p class="text-caption text-grey-lighten-2">
      {{ dataEventProgress?.message }}
    </p>

    <template #actions>
      <v-btn color="white" variant="plain" @click="confirmOrdersUpdate(false)">
        Não
      </v-btn>

      <v-btn color="white" variant="plain" @click="confirmOrdersUpdate(true)">
        Sim
      </v-btn>
    </template>
  </v-snackbar>
</template>
