<script setup lang="ts">
import type { SalesOrder } from "~/interfaces/SalesCollections";

const props = defineProps<{
  salesCollectionId: number;
  salesOrder: SalesOrder[];
}>();

const emit = defineEmits(["update"]);

const disabled = computed(() =>
  props.salesOrder.every((e) => e.verified_status_ecom)
);

const snackbar = ref<boolean>(false);
const currentTime = ref(0);

const loading = ref(false);

const { $customFetch } = useNuxtApp();

const { capitalizeFirstLetter } = useCapitalize();

const alterStatusRomaneio = async () => {
  loading.value = true;

  try {
    const { success } = await $customFetch<{ success: boolean }>(
      `sales-collection/status-romaneio`,
      {
        method: "POST",
        body: {
          sales_collection_id: props.salesCollectionId,
        },
      }
    );

    $toast().success("Sucesso em alterar os status para enviado.");

    loading.value = false;

    if (success) {
      emit("update");
    }
  } catch (error) {
    const err = error as { statusText: string; data: { error: string } };

    $toast().error(
      `${capitalizeFirstLetter(err.data.error) ?? err.statusText}`
    );

    loading.value = false;
  }
};
</script>

<template>
  <v-tooltip
    location="top"
    text="Alterar status para enviado"
    style="
      --v-theme-surface-variant: 76, 175, 80;
      --v-theme-on-surface-variant: 255, 255, 255;
    "
  >
    <template #activator="{ props: tooltip }">
      <v-btn
        v-bind="tooltip"
        icon="mdi-list-status"
        variant="plain"
        size="small"
        :color="disabled ? 'grey' : 'green'"
        density="comfortable"
        :loading="loading"
        :disabled="disabled"
        @click="snackbar = true"
      />
    </template>
  </v-tooltip>

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
    <div class="text-subtitle-1">
      Deseja atualizar todos os pedido para enviado ?
    </div>

    <template #actions>
      <v-btn color="white" variant="plain" @click="snackbar = false">
        Não
      </v-btn>

      <v-btn
        color="white"
        variant="plain"
        @click="
          snackbar = false;
          alterStatusRomaneio();
        "
      >
        Sim
      </v-btn>
    </template>
  </v-snackbar>
</template>
