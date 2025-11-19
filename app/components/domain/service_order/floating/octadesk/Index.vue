<script lang="ts" setup>
import type { OctadeskMessage } from "~/interfaces/ServiceOrder";

import Card from "./Card.vue";

const { params } = useRoute();

const messages = ref<OctadeskMessage[]>([]);

const dialog = ref(false);

const { $customFetch } = useNuxtApp();

const serviceOrderStore = useServiceOrderStore();
const { status } = storeToRefs(serviceOrderStore);

const getMessages = async () => {
  try {
    const response = await $customFetch<OctadeskMessage[]>(
      "service-order/octadesk/get-octadesk-messages",
      {
        method: "GET",
        query: {
          service_order_id: params.id,
          status: status.value,
        },
      }
    );

    messages.value = response;
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};

watch(
  () => dialog.value,
  (value) => {
    if (value) {
      getMessages();
    }
  }
);

const clear = () => {
  messages.value = [];
};
</script>

<template>
  <v-dialog
    v-model="dialog"
    width="800px"
    transition="dialog-top-transition"
    @after-leave="clear"
  >
    <template #activator="{ props: dialogProps }">
      <v-fab
        v-bind="dialogProps"
        icon="mdi-whatsapp"
        color="green"
        class="button"
      />
    </template>

    <template #default>
      <Card
        v-if="messages.length > 0"
        :messages="messages"
        @close="dialog = false"
      />

      <v-card
        v-else
        title="Para o status atual não há mensagens disponíveis"
        subtitle="Parece que não há mensagens disponíveis"
        text="Verifique se o status atual da ordem de serviço está correto"
        rounded="xl"
        class="text-center"
      />
    </template>
  </v-dialog>
</template>

<style scoped>
.button {
  opacity: 0.2;
}

.button:hover {
  opacity: 0.8;
}
</style>
