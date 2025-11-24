<script lang="ts" setup>
import type { OctadeskMessage } from "~/interfaces/ServiceOrder";

defineProps<{
  messages: OctadeskMessage[];
}>();

const emit = defineEmits(["close"]);

const selectMessage = ref<OctadeskMessage[]>([]);

const { params } = useRoute();

const { $customFetch } = useNuxtApp();

const serviceOrderStore = useServiceOrderStore();
const { status } = storeToRefs(serviceOrderStore);

const sendMessages = async () => {
  try {
    await $customFetch<OctadeskMessage[]>(
      "service-order/octadesk/send-octadesk-status-message",
      {
        method: "POST",
        body: {
          id: params.id,
          status: status.value,
          type: selectMessage.value[0],
        },
      }
    );

    $toast().success("Mensagem enviada com sucesso!");

    emit("close");
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(`${err.data.error ?? err.statusText}`);
  }
};
</script>

<template>
  <v-card
    title="SELECIONE A MENSAGEM DESEJADA"
    rounded="xl"
    class="text-primary"
  >
    <template #text>
      <v-list
        v-model:selected="selectMessage"
        lines="three"
        select-strategy="single-leaf"
      >
        <v-list-item
          v-for="item in messages"
          :key="item.type"
          :subtitle="item.message"
          :value="item.type"
        >
          <template #prepend="{ isSelected }">
            <v-list-item-action start>
              <v-checkbox-btn color="primary" :model-value="isSelected" />
            </v-list-item-action>
          </template>

          <template #title>
            <span class="text-primary"> {{ item.label }}</span>
          </template>
        </v-list-item>
      </v-list>
    </template>

    <template #actions>
      <v-spacer />

      <v-btn
        text="ENVIAR"
        width="8vw"
        variant="flat"
        base-color="primary"
        @click="sendMessages"
      />

      <v-spacer />
    </template>
  </v-card>
</template>
